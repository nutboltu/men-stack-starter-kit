'use strict';

var expressValidator = require('express-validator');

expressValidator.validator.extend('isObjectId' , function(str){
    return str.match(regExLib.validObjectId);
});

expressValidator.validator.extend('isBoolean', function(str){
    return str == 'true' || str == 'false';
});