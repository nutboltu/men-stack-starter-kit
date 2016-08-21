/**
 * @author Farhad Yasir
 */
'use strict';

var validPasswordRegEx = require('../../config/config').validPasswordRegEx;

var areRequired = function(req, params){

    params.forEach(function(param){
        req.assert(param , param + ' is required.').notEmpty();
    });
};

var isValidEmail = function(req){
    req.assert('email', ' Invalid email address.').isEmail();
};

var isValidPassword = function(req){
    req.assert('password', 'Invalid password').matches(validPasswordRegEx);

};

var isBoolean = function(req, param){

    if(!_.isUndefined(req.param(param)) && !_.isNull(req.param(param))){
        req.assert(param, 'Invalid boolean object').isBoolean();
    }
};

var isObjectId = function(req, param){

    if(!_.isUndefined(req.param(param)) && !_.isNull(req.param(param)) ){

        req.assert(param, 'Invalid object id').isObjectId();
    }
};

var processValidationErrors = function(req, res, next){

    var validationErrors = req.validationErrors();
    if(validationErrors){

        res.status(500).json();
    }
    else
        next();
};

module.exports.areRequired      = areRequired;
module.exports.isValidEmail     = isValidEmail;
module.exports.isValidPassword  = isValidPassword;
module.exports.isBoolean        = isBoolean;
module.exports.isObjectId       = isObjectId;
