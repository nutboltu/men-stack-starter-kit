'use strict';
var errorHandler  = require('./error.handler');
var jwt             = require('jwt-simple');
var secret          = require('../../config').jwtSecret;
var algorithm       =   'HS512';

var encodeToken = function(payload, callback){
    try{
        var token = jwt.encode(payload, secret, algorithm);
        callback(null, token);
    }
    catch(err){
        callback(err);
    }
};

var decodeToken = function(payload, callback){
    try{
        var token = jwt.decode(payload, secret, false, algorithm);
        callback(null, token);
    }
    catch(err){
        callback(err);
    }
};

var validateToken = function(token, callback){

    if(token){
        decodeToken(token, function(err, decodedPayload){
            if(err || !decodedPayload){
                return callback(errorHandler.INVALID_ACCESS_TOKEN);
            }
            else if (decodedPayload.exp <= Date.now()){
                return callback(errorHandler.ACCESS_TOKEN_EXPIRED);
            }
            else if (decodedPayload.exp <= Date.now()){
                return callback(errorHandler.ACCESS_TOKEN_EXPIRED)
            }
            else{
                callback(null, decodedPayload);
            }
        });

    }
    else return callback(errorHandler.INVALID_ACCESS_TOKEN);

};

module.exports = {
    encodeToken: encodeToken,
    decodeToken: decodeToken,
    validateToken: validateToken
};
