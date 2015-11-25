'use strict';

angular.module('core.admin').run(['Menus',
  function (Menus) {
  	    //Adding the topbar menu
    Menus.addMenu('admin.sidebar', {
      roles: ['admin']
    });
    Menus.addMenuItem('admin.sidebar', {
      title: 'Dashboard',
      state: 'admin.home',
      //type: 'dropdown',
      icon: { 'simpleline': 'home' },
      roles: ['admin']
    });
  }
]);
