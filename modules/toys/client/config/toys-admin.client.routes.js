'use strict';

// Setting up route
angular.module('toys.admin').config(['$stateProvider',
  function ($stateProvider) {
    // Toys state routing
    $stateProvider
      .state('admin.toys', {
        abstract: true,
        url: '/toys',
        template: '<ui-view/>'
      })
      .state('admin.toys.list', {
        url: '',
        templateUrl: 'modules/toys/client/views/admin/list-toys.client.view.html'
      })
      .state('admin.toys.create', {
        url: '/create',
        templateUrl: 'modules/toys/client/views/admin/create-toy.client.view.html',
        data: {
          roles: ['admin']
        }
      })
      .state('admin.toys.view', {
        url: '/:toySlug',
        templateUrl: 'modules/toys/client/views/admin/view-toy.client.view.html'
      })
      .state('admin.toys.edit', {
        url: '/:toySlug/edit',
        templateUrl: 'modules/toys/client/views/admin/edit-toy.client.view.html',
        data: {
          roles: ['admin']
        }
      })
      .state('admin.toys.pictures', {
        url: '/:toyID/pictures',
        templateUrl: 'modules/toys/client/views/admin/add-image-toy.client.view.html',
        data: {
          roles: ['admin']
        }
      });
  }
]);
