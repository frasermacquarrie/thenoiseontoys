'use strict';

//Toys service used for communicating with the articles REST endpoints
angular.module('manufacturers').factory('Manufacturers', ['$resource',
  function ($resource) {
    return $resource('api/manufacturers/:manufacturerId/:controller', {
      manufacturerId: '@_id'
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
