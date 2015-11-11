'use strict';

/**
 * Module dependencies.
 */
var toysPolicy = require('../policies/toys.server.policy'),
  toys = require('../controllers/toys.server.controller');

module.exports = function (app) {
  // Articles collection routes
  app.route('/api/toys').all(toysPolicy.isAllowed)
    .get(toys.list)
    .post(toys.create);

  app.route('/api/toys/read-slug').get(toysPolicy.isAllowed, toys.readBySlug);

  // Single article routes
  app.route('/api/toys/:toyId').all(toysPolicy.isAllowed)
    .get(toys.read)
    .put(toys.update)
    .delete(toys.delete);

  // Finish by binding the article middleware
  app.param('toyId', toys.toyByID);
};
