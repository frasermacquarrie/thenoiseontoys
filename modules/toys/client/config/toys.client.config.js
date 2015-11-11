'use strict';

// Configuring the Toys module
angular.module('toys').run(['Menus',
  function (Menus) {
    // Add the toys dropdown item
    Menus.addMenuItem('topbar', {
      title: 'Toys',
      state: 'toys',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    Menus.addSubMenuItem('topbar', 'toys', {
      title: 'List Toys',
      state: 'toys.list'
    });

    // Add the dropdown create item
    Menus.addSubMenuItem('topbar', 'toys', {
      title: 'Create Toy',
      state: 'toys.create',
      roles: ['user']
    });
  }
]);
