'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.Types.ObjectId;
var userDefinition = require('../definitions/user.definition').userDefinition;
var objectTransform = require('../../utilities/helpers/schema.object.transform');

var userSchema = new Schema(userDefinition);

userSchema.pre('save' , function(next){
    if(this.isNew === true){
        this._id = new ObjectId;
    }
    next();
});

userSchema.options.toObject = objectTransform;

module.exports.userSchema = userSchema;