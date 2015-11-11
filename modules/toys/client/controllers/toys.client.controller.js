'use strict';

// Toys controller
angular.module('toys').controller('ToysController', ['$scope', '$stateParams', '$location', 'Authentication', 'Toys',
  function ($scope, $stateParams, $location, Authentication, Toys) {
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
  }
]);
