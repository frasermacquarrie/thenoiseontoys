'use strict';

angular.module('core.admin').controller('AdminSidebarController', ['$scope', '$state', 'Authentication', 'Menus',
  function ($scope, $state, Authentication, Menus) {
    // Expose view variables
    $scope.$state = $state;
    $scope.authentication = Authentication;

    // Get the topbar menu
    $scope.menu = Menus.getMenu('admin.sidebar');

    // Toggle the menu items
    $scope.isCollapsed = false;
    $scope.toggleCollapsibleMenu = function () {
      $scope.isCollapsed = !$scope.isCollapsed;
    };

    $scope.getIcon = function (icon) {
      if (!icon) {
        return [];
      }
      if (icon.fontawesome) {
        return ['fa', 'fa-' + icon.fontawesome];
      }
      if (icon.simpleline) {
        return ['icon-' + icon.simpleline];
      }
      if (icon.glyphicon) {
        return ['glyphicon', 'glyphicon-' + icon.glyphicon];
      }
      return [];
    };

    // Collapsing the menu after navigation
    $scope.$on('$stateChangeSuccess', function () {
      $scope.isCollapsed = false;
    });
  }
]);
