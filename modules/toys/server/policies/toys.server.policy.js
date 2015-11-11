'use strict';

/**
 * Module dependencies.
 */
var acl = require('acl');

// Using the memory backend
acl = new acl(new acl.memoryBackend());

/**
 * Invoke Articles Permissions
 */
exports.invokeRolesPolicies = function () {
  acl.allow([{
    roles: ['admin'],
    allows: [{
      resources: '/api/toys',
      permissions: '*'
    }, {
      resources: '/api/toys/:toyId',
      permissions: '*'
    }]
  }, {
    roles: ['editor'],
    allows: [{
      resources: '/api/toys',
      permissions: '*'
    }, {
      resources: '/api/toys/:toyId',
      permissions: '*'
    }]
  }, {
    roles: ['user'],
    allows: [{
      resources: '/api/toys',
      permissions: ['get']
    }, {
      resources: '/api/toys/:toyId',
      permissions: ['get']
    }]
  }, {
    roles: ['guest'],
    allows: [{
      resources: '/api/toys',
      permissions: ['get']
    }, {
      resources: '/api/toys/:toyId',
      permissions: ['get']
    }]
  }, {
    roles: ['admin','user','guest'],
    allows: [{
      resources: '/api/toys/read-slug',
      permissions: ['get']
    }]
  }]);
};

/**
 * Check If Articles Policy Allows
 */
exports.isAllowed = function (req, res, next) {
  var roles = (req.user) ? req.user.roles : ['guest'];

  // If a toy is being processed and the current user created it then allow any manipulation
  if (req.toy && req.user && req.toy.user.id === req.user.id) {
    return next();
  }

  // Check for user roles
  acl.areAnyRolesAllowed(roles, req.route.path, req.method.toLowerCase(), function (err, isAllowed) {
    if (err) {
      // An authorization error occurred.
      return res.status(500).send('Unexpected authorization error');
    } else {
      if (isAllowed) {
        // Access granted! Invoke next middleware
        return next();
      } else {
        return res.status(403).json({
          message: 'User is not authorized'
        });
      }
    }
  });
};
