'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
  path = require('path'),
  mongoose = require('mongoose'),
  multer = require('multer'),
  Toy = mongoose.model('Toy'),
  Manufacturer = mongoose.model('Manufacturer'),
  //ImageModel = mongoose.model('ImageModel'),
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
  Toy.find().sort('-created').populate('user', 'displayName').populate('manufacturer').exec(function (err, toys) {
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

  Toy.findById(id).populate('user', 'displayName').populate('manufacturer').exec(function (err, toy) {
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
  Toy.findOne(req.query).populate('user', 'displayName').populate('manufacturer').exec(function(err, toy) {
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

/**
 * Update profile picture
 */
exports.addImage = function (req, res) {
  var toy = req.toy;

  var message = null;
  var uploadDest = {  
    dest:'./modules/users/client/img/profile/uploads/',       
    limits: {
      fileSize: 64*1024*1024 // Max file size in bytes (64 MB)
    }
  };
  var upload = multer(uploadDest).single('newProfilePicture');
  var profileUploadFileFilter = require(path.resolve('./config/lib/multer')).profileUploadFileFilter;
  
  //console.log(toy._id);

  // Filtering to upload only images
  upload.fileFilter = profileUploadFileFilter;

  if (toy) {
    upload(req, res, function (uploadError) {
      if(uploadError) {
        return res.status(400).send({
          message: 'Error occurred while uploading image'
        });
      } else {
        //var image = new ImageModel({ url: uploadDest.dest + req.file.filename });
        toy.images.push({ url: uploadDest.dest + req.file.filename });

        toy.save(function (saveError) {
          if (saveError) {
            return res.status(400).send({
              message: errorHandler.getErrorMessage(saveError)
            });
          } else {
            req.login(req.user, function (err) {
              if (err) {
                res.status(400).send(err);
              } else {
                res.json(req.toy);
              }
            });
          }
        });
      }
    });
  } else {
    res.status(400).send({
      message: 'User is not signed in'
    });
  }
};