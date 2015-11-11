'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
  path = require('path'),
  mongoose = require('mongoose'),
  Toy = mongoose.model('Toy'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create a toy
 */
exports.create = function (req, res) {
  var toy = new Toy(req.body);
  toy.user = req.user;

  toy.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(toy);
    }
  });
};

/**
 * Show the current toy
 */
exports.read = function (req, res) {
  res.json(req.toy);
};

/**
 * Update a toy
 */
exports.update = function (req, res) {
  var toy = req.toy;

  toy = _.extend(toy, req.body);

  toy.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(toy);
    }
  });
};

/**
 * Delete a toy
 */
exports.delete = function (req, res) {
  var toy = req.toy;

  toy.remove(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(toy);
    }
  });
};

/**
 * List of Articles
 */
exports.list = function (req, res) {
  Toy.find().sort('-created').populate('user', 'displayName').exec(function (err, toys) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(toys);
    }
  });
};

/**
 * Article middleware
 */
exports.toyByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Toy is invalid'
    });
  }

  Toy.findById(id).populate('user', 'displayName').exec(function (err, toy) {
    if (err) {
      return next(err);
    } else if (!toy) {
      return res.status(404).send({
        message: 'No toy with that identifier has been found'
      });
    }
    req.toy = toy;
    next();
  });
};

exports.readBySlug = function(req, res){
  Toy.findOne(req.query).populate('user', 'displayName').exec(function(err, toy) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err),
        query: req.query
      });
    } else {
      res.json(toy);
    }
  });
};
