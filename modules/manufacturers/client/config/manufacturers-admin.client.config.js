'use strict';

// Configuring the Toys module
angular.module('manufacturers.admin').run(['Menus',
  function (Menus) {
    // Add the toys dropdown item
    Menus.addMenuItem('admin.sidebar', {
      title: 'Manufacturers',
      state: 'admin.manufacturers',
      type: 'dropdown',
      roles: ['*'],
      icon: { simpleline: 'wrench' }
    });

    // Add the dropdown list item
    Menus.addSubMenuItem('admin.sidebar', 'admin.manufacturers', {
      title: 'List Manufacturers',
      state: 'admin.manufacturers.list',
      icon: { simpleline: 'list' }
    });

    // Add the dropdown create item
    Menus.addSubMenuItem('admin.sidebar', 'admin.manufacturers', {
      title: 'Create Manufacturer',
      state: 'admin.manufacturers.create',
      roles: ['admin', 'editor'],
      icon: { simpleline: 'plus' }
    });
  }
]);
