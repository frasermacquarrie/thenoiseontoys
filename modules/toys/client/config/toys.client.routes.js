'use strict';

// Setting up route
angular.module('toys').config(['$stateProvider',
  function ($stateProvider) {
    // Toys state routing
    $stateProvider
      .state('toys', {
        abstract: true,
        url: '/toys',
        template: '<ui-view/>'
      })
      .state('toys.list', {
        url: '',
        templateUrl: 'modules/toys/client/views/list-toys.client.view.html'
      })
      .state('toys.create', {
        url: '/create',
        templateUrl: 'modules/toys/client/views/create-toy.client.view.html',
        data: {
          roles: ['admin']
        }
      })
      .state('toys.view', {
        url: '/:toySlug',
        templateUrl: 'modules/toys/client/views/view-toy.client.view.html'
      })
      .state('toys.edit', {
        url: '/:toySlug/edit',
        templateUrl: 'modules/toys/client/views/edit-toy.client.view.html',
        data: {
          roles: ['admin']
        }
      })
      .state('toys.pictures', {
        url: '/:toyID/pictures',
        templateUrl: 'modules/toys/client/views/add-image-toy.client.view.html',
        data: {
          roles: ['admin']
        }
      });
  }
]);
