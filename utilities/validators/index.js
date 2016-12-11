'use strict';

var expressValidator = require('express-validator');
var jwtTokenHelper   = require('../helpers/jwt.token.helper');

var hasValidToken =  function(token){
    if(token){
        jwtTokenHelper.validateToken(token, function(err, decodedToken){
            return !!decodedToken;
        });
    }
    else return false;

};

module.exports = expressValidator({
    customValidators: {
        hasValidToken: hasValidToken
    }
});
