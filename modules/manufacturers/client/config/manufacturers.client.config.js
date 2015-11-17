'use strict';

// Configuring the Toys module
angular.module('manufacturers').run(['Menus',
  function (Menus) {
    // Add the toys dropdown item
    Menus.addMenuItem('topbar', {
      title: 'Manufacturers',
      state: 'manufacturers',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    Menus.addSubMenuItem('topbar', 'manufacturers', {
      title: 'List Manufacturers',
      state: 'manufacturers.list'
    });

    // Add the dropdown create item
    Menus.addSubMenuItem('topbar', 'manufacturers', {
      title: 'Create Manufacturer',
      state: 'manufacturers.create',
      roles: ['admin', 'editor']
    });
  }
]);
