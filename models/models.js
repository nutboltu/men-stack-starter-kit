'use strict';

var mongoose = require('mongoose');

var userSchema                  = require('./schemas/user.schema').userSchema;

var userModel                   = mongoose.model('user', userSchema , 'users');

module.exports.Models = {
    userModel: userModel
};