/**
 * @author Farhad Yasir
 */
'use strict';

var validPasswordRegEx = require('../../config').validPasswordRegEx;
var errorStatus        = require('../helpers/error.handler').errorStatus;
var areRequired = function(req, params){

    params.forEach(function(param){
        req.assert(param , param + ' is required').notEmpty();
    });
};

var isValidEmail = function(req){
    req.assert('email', errorStatus.INVALID_EMAIL).isEmail();
};

var isValidPassword = function(req){
    req.assert('password', errorStatus.INVALID_PASSWORD).matches(validPasswordRegEx);

};

var isBoolean = function(req, param){

    if(!_.isUndefined(req.param(param)) && !_.isNull(req.param(param))){
        req.assert(param, 'Invalid boolean object').isBoolean();
    }
};

var hasValidToken = function(req){
    var token = req.headers['x-access-token'];
    req.assert('token', errorStatus.INVALID_ACCESS_TOKEN).hasValidToken(token);
};


module.exports = {
    areRequired: areRequired,
    isValidEmail: isValidEmail,
    isValidPassword: isValidPassword,
    isBoolean: isBoolean,
    hasValidToken: hasValidToken
};
