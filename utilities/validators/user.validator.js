'use strict';

var validationChecker   = require('./validation.checker');
var validationError     = require('./validation.error');

var register = function(req, res, next){

    validationChecker.areRequired(req, ['firstName', 'lastName', 'email', 'password']);
    validationChecker.isValidEmail(req);
    validationChecker.isValidPassword(req);
    validationError.processErrors(req, res, next);

};

var login = function(req, res, next){

    validationChecker.areRequired(req, ['email', 'password']);
    validationChecker.isValidEmail(req);
    validationChecker.isValidPassword(req);
    validationError.processErrors(req, res, next);
};

module.exports.register     = register;
module.exports.login        = login;
