'use strict';

// Configuring the Articles module
angular.module('users.admin.routes').run(['Menus',
  function (Menus) {
  	Menus.addMenuItem('admin.sidebar', {
      title: 'Users',
      state: 'admin.users',
      type: 'dropdown',
      roles: ['*'],
      icon: { simpleline: 'user' }
    });
    Menus.addSubMenuItem('admin.sidebar', 'admin.users', {
      title: 'List Users',
      state: 'admin.users.list',
      icon: { simpleline: 'list' }
    });
  }
]);
