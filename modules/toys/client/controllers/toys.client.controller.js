'use strict';

// Toys controller
angular.module('toys').controller('ToysController', ['$scope', '$stateParams', '$location', '$timeout', '$window', 'Authentication', 'FileUploader', 'Toys',
  function ($scope, $stateParams, $location, $timeout, $window, Authentication, FileUploader, Toys) {
    $scope.authentication = Authentication;

    // Create new Toy
    $scope.create = function (isValid) {
      $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'toyForm');

        return false;
      }

      // Create new Toy object
      var toy = new Toys({
        title: this.title,
        content: this.content
      });
      toy.slug = toy.title.toLowerCase().replace(/ /g, '-');

      // Redirect after save
      toy.$save(function (response) {
        $location.path('toys/' + response.slug);

        // Clear form fields
        $scope.title = '';
        $scope.content = '';
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

    // Remove existing Toy
    $scope.remove = function (toy) {
      if (toy) {
        if (confirm('This will delete the toy.  Are you sure?')) {
          toy.$remove();

          for (var i in $scope.toys) {
            if ($scope.toys[i] === toy) {
              $scope.toys.splice(i, 1);
            }
          }
        } else {
          $scope.toy.$remove(function () {
            $location.path('toys');
          });
        }
      }
    };

    // Update existing Toy
    $scope.update = function (isValid) {
      $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'toyForm');

        return false;
      }

      var toy = $scope.toy;
      toy.slug = toy.title.toLowerCase().replace(/ /g, '-');
      
      toy.$update(function () {
        $location.path('toys/' + toy.slug);
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

    // Find a list of Toys
    $scope.find = function () {
      $scope.toys = Toys.query();
    };

    // Find existing Toy
    $scope.findOne = function () {
      $scope.toy = Toys.getBySlug({
        slug: $stateParams.toySlug
      });
    };

    $scope.editOne = function () {
      $scope.toy = Toys.getBySlug({
        slug: $stateParams.toySlug
      }, function() {
        $scope.uploader.url = 'api/toys/' + $scope.toy._id + '/pictures';
      });
    };

    $scope.uploader = new FileUploader({
      url: 'api/toys/' + $stateParams.toyID + '/pictures',
      alias: 'newProfilePicture'
    });

    // Set file uploader image filter
    $scope.uploader.filters.push({
      name: 'imageFilter',
      fn: function (item, options) {
        var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
        return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
      }
    });

    // Called after the user selected a new picture file
    $scope.uploader.onAfterAddingFile = function (fileItem) {
      if ($window.FileReader) {
        var fileReader = new FileReader();
        fileReader.readAsDataURL(fileItem._file);

        fileReader.onload = function (fileReaderEvent) {
          $timeout(function () {
            $scope.imageURL = fileReaderEvent.target.result;
          }, 0);
        };
      }

    };

    // Called after the user has successfully uploaded a new picture
    $scope.uploader.onSuccessItem = function (fileItem, response, status, headers) {
      // Show success message
      $scope.success = true;

      // Populate user object
      //$scope.user = Authentication.user = response;
      
      // Clear upload buttons
      $scope.cancelUpload();

      $timeout(function () {
        $location.path('toys/' + $scope.toy.slug + '/edit');
      }, 0);
      
    };

    // Called after the user has failed to uploaded a new picture
    $scope.uploader.onErrorItem = function (fileItem, response, status, headers) {
      // Clear upload buttons
      $scope.cancelUpload();

      // Show error message
      $scope.error = response.message;
    };

    // Change user profile picture
    $scope.uploadImage = function () {
      // Clear messages
      $scope.success = $scope.error = null;

      // Start upload
      $scope.uploader.uploadAll();

    };

    // Cancel the upload process
    $scope.cancelUpload = function () {
      $scope.uploader.clearQueue();
      //$scope.images = $scope.user.images;

    };

    // Remove existing Toy
    $scope.removeImage = function (image) {


      if ($scope.toy && image) {

        for (var i in $scope.toy.images) {
          if ($scope.toy.images[i] === image) {
            $scope.toy.images.splice(i, 1);

          }
        }

        $scope.toy.$update(function (response) {
          //$location.path('toys/' + toy._id + /);
        }, function (errorResponse) {
          $scope.error = errorResponse.data.message;
        });
      } /*else {
        $scope.toy.$remove(function () {
          $location.path('toys');
        });
      } */
    };

  }
]);
