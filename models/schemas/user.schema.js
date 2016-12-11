'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.Types.ObjectId;
var userDefinition = require('../definitions/user.definition').userDefinition;
var objectTransform = require('../schema.object.transform.js');

var userSchema = new Schema(userDefinition);

userSchema.pre('save' , function(next){
    if(this.isNew === true){
        this._id = new ObjectId;
    }
    next();
});

userSchema.options.toObject = objectTransform;

module.exports ={
    userSchema: userSchema
};