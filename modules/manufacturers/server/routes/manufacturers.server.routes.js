'use strict';

/**
 * Module dependencies.
 */
var manufacturersPolicy = require('../policies/manufacturers.server.policy'),
  manufacturers = require('../controllers/manufacturers.server.controller');

module.exports = function (app) {
  // Articles collection routes
  app.route('/api/manufacturers').all(manufacturersPolicy.isAllowed)
    .get(manufacturers.list)
    .post(manufacturers.create);

  app.route('/api/manufacturers/read-slug').get(manufacturersPolicy.isAllowed, manufacturers.readBySlug);

  // Single article routes
  app.route('/api/manufacturers/:manufacturerId').all(manufacturersPolicy.isAllowed)
    .get(manufacturers.read)
    .put(manufacturers.update)
    .delete(manufacturers.delete);

  // Finish by binding the article middleware
  app.param('manufacturerId', manufacturers.manufacturerByID);
};
