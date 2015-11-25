'use strict';

// Toys controller
angular.module('manufacturers').controller('ManufacturersController', ['$scope', '$stateParams', '$location', '$timeout', 'Authentication', 'Manufacturers',
  function ($scope, $stateParams, $location, $timeout, Authentication, Manufacturers) {
    $scope.authentication = Authentication;

    // Create new Toy
    $scope.create = function (isValid) {
      $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'manufacturerForm');

        return false;
      }

      // Create new Toy object
      var manufacturer = new Manufacturers({
        name: this.name,
        url: this.url
      });
      console.log(manufacturer);
      manufacturer.slug = manufacturer.name.toLowerCase().replace(/ /g, '-');

      // Redirect after save
      manufacturer.$save(function (response) {
        $location.path('manufacturers' + response.slug);

        // Clear form fields
        $scope.name = '';
        $scope.url = '';
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

    // Remove existing manufacturer
    $scope.remove = function (manufacturer) {
      if (manufacturer) {
        if (confirm('This will delete the manufacturer.  Are you sure?')) {
          manufacturer.$remove();

          for (var i in $scope.manufacturers) {
            if ($scope.manufacturers[i] === manufacturer) {
              $scope.manufacturers.splice(i, 1);
            }
          }
        } else {
          $scope.manufacturer.$remove(function () {
            $location.path('manufacturers');
          });
        }
      }
    };

    // Update existing manufacturer
    $scope.update = function (isValid) {
      $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'toyForm');

        return false;
      }

      var manufacturer = $scope.manufacturer;
      manufacturer.slug = manufacturer.name.toLowerCase().replace(/ /g, '-');
      
      manufacturer.$update(function () {
        $location.path('manufacturers/' + manufacturer.slug);
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

    // Find a list of Toys
    $scope.find = function () {
      $scope.manufacturers = Manufacturers.query();
    };

    // Find existing Toy
    $scope.findOne = function () {
      $scope.manufacturer = Manufacturers.getBySlug({
        slug: $stateParams.manufacturerSlug
      });
    };

    $scope.canEdit = function () {
      return Authentication.user.roles.contains('admin');
    };
  }
]);
