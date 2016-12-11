'use strict';

var ENUMS = require('../../utilities/helpers/enums');
var ObjectId = require('mongoose').Schema.ObjectId;

var userDefinition = {

    _id:{type: ObjectId},
    avatar: {type: String},
    firstName: {type: String, required: true},
    lastName: {type:String , required: true},
    email: {type: String, required: true, unique: true, index: true},
    password: {type: String, select: false},
    salt: {type: String, select: false},
    status: {type: String, required:true, default: ENUMS.status.active},
    dateCreated: {type: Date},
    dateModified:{type:Date}

};

module.exports = {
    userDefinition: userDefinition
};
