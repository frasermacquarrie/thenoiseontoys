'use strict';

// Configuring the Toys module
angular.module('toys.admin').run(['Menus',
  function (Menus) {
    // Add the toys dropdown item
    Menus.addMenuItem('admin.sidebar', {
      title: 'Toys',
      state: 'admin.toys',
      type: 'dropdown',
      icon: 'rocket',
    });

    // Add the dropdown list item
    Menus.addSubMenuItem('admin.sidebar', 'admin.toys', {
      title: 'List Toys',
      state: 'admin.toys.list',
      icon: 'list'
    });

    // Add the dropdown create item
    Menus.addSubMenuItem('admin.sidebar', 'admin.toys', {
      title: 'Create Toy',
      state: 'admin.toys.create',
      icon: 'plus'
    });
  }
]);
