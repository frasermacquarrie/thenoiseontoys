'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Toy Schema
 */
var ManufacturerSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  name: {
    type: String,
    default: '',
    trim: true,
    unique: 'Manufacturer name already exists',
    required: 'Manufacturer name cannot be blank'
  },
  url: {
    type: String,
    default: '',
    trim: true
  },
  slug: {
    type: String,
    default: '',
    trim: true,
    unique: 'Slug already exists',
    required: 'Slug cannot be blank'
  }
});


mongoose.model('Manufacturer', ManufacturerSchema);
