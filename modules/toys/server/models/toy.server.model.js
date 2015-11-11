'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

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
    type: [String],
    default: ['modules/toys/client/img/profile/default.png']
  },
});

mongoose.model('Toy', ToySchema);
