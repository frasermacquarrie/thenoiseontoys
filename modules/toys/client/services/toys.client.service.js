'use strict';

//Toys service used for communicating with the articles REST endpoints
angular.module('toys').factory('Toys', ['$resource',
  function ($resource) {
    return $resource('api/toys/:toyId/:controller', {
      toyId: '@_id'
    }, {
      update: {
        method: 'PUT'
      },
      getBySlug: {
        method: 'GET',
        params: {
          controller: 'read-slug'
        }
      }
    });
  }
]);
