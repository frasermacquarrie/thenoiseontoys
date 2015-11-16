'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var ImageSchema = new Schema({
  url: {
    type: String,
    default: '',
    required: 'URL cannot be blank'
  },
  title: {
    type: String,
    default: '',
    trim: true
  },
  alt: {
    type: String,
    default: '',
    trim: true
  }
});

/**
 * Toy Schema
 */
var ToySchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  title: {
    type: String,
    default: '',
    trim: true,
    unique: 'Title already exists',
    required: 'Title cannot be blank'
  },
  content: {
    type: String,
    default: '',
    trim: true
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  slug: {
    type: String,
    default: '',
    trim: true,
    unique: 'Slug already exists',
    required: 'Slug cannot be blank'
  },
  images: {
    type: [ImageSchema]
  },
});


mongoose.model('Toy', ToySchema);
