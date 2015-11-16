'use strict';

// Setting up route
angular.module('manufacturers').config(['$stateProvider',
  function ($stateProvider) {
    // Toys state routing
    $stateProvider
      .state('manufacturers', {
        abstract: true,
        url: '/manufacturers',
        template: '<ui-view/>'
      })
      .state('manufacturers.list', {
        url: '',
        templateUrl: 'modules/manufacturers/client/views/list-manufacturers.client.view.html'
      })
      .state('manufacturers.create', {
        url: '/create',
        templateUrl: 'modules/manufacturers/client/views/create-manufacturer.client.view.html',
        data: {
          roles: ['admin', 'editor']
        }
      })
      .state('manufacturers.view', {
        url: '/:manufacturerSlug',
        templateUrl: 'modules/manufacturers/client/views/view-manufacturer.client.view.html'
      })
      .state('manufacturers.edit', {
        url: '/:manufacturerSlug/edit',
        templateUrl: 'modules/manufacturers/client/views/edit-manufacturer.client.view.html',
        data: {
          roles: ['admin', 'editor']
        }
      });
  }
]);
