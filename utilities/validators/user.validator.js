'use strict';

var validationChecker   = require('./validation.checker');
var validationError     = require('./validation.error');

var add = function(req, res, next){
    validationChecker.areRequired(req, ['firstName','lastName', 'email', 'password']);
    validationError.processErrors(req, res, next);
};

var hasValidToken = function(req, res, next){
    validationChecker.hasValidToken(req);
    validationError.processErrors(req, res, next);
};

module.exports = {
    add: add,
    hasValidToken: hasValidToken
};