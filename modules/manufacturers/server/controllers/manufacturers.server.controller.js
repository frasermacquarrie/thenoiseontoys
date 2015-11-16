'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
  path = require('path'),
  mongoose = require('mongoose'),
  multer = require('multer'),
  Manufacturer = mongoose.model('Manufacturer'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create a manufacturer
 */
exports.create = function (req, res) {
  var manufacturer = new Manufacturer(req.body);
  
  manufacturer.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(manufacturer);
    }
  });
};

/**
 * Show the current manufacturer
 */
exports.read = function (req, res) {
  res.json(req.manufacturer);
};

/**
 * Update a manufacturer
 */
exports.update = function (req, res) {
  var manufacturer = req.manufacturer;

  manufacturer = _.extend(manufacturer, req.body);

  manufacturer.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(manufacturer);
    }
  });
};

/**
 * Delete a manufacturer
 */
exports.delete = function (req, res) {
  var manufacturer = req.manufacturer;

  manufacturer.remove(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(manufacturer);
    }
  });
};

/**
 * List of manufacturers
 */
exports.list = function (req, res) {
  Manufacturer.find().sort('name').exec(function (err, manufacturers) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(manufacturers);
    }
  });
};

/**
 * Article middleware
 */
exports.manufacturerByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Manufacturer is invalid'
    });
  }

  Manufacturer.findById(id).exec(function (err, manufacturer) {
    if (err) {
      return next(err);
    } else if (!manufacturer) {
      return res.status(404).send({
        message: 'No manufacturer with that identifier has been found'
      });
    }
    req.manufacturer = manufacturer;
    next();
  });
};

exports.readBySlug = function(req, res){
  Manufacturer.findOne(req.query).exec(function(err, manufacturer) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err),
        query: req.query
      });
    } else {
      res.json(manufacturer);
    }
  });
};