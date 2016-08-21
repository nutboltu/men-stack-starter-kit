'use strict';

var async           = require('async');
var errorHandler  = require('./error.handler');
var jwt             = require('jwt-simple');
var secret          = require('../../config/config').secret;
var algorithm       =   'HS512';

var encodeToken = function(payload, callback){

    try{
        var token = jwt.encode(payload , secret, algorithm);
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

var validateToken = function(req , res, next){
    var tasks = [
        function(cb){
            var payload = req.headers['x-access-token'];
            if(payload){
                cb(null, payload);

            }
            else return cb(errorHandler.INVALID_ACCESS_TOKEN);
        },
        function(payload , cb){

            decodeToken(payload, function(err, decodedPayload){
                if(err || !decodedPayload){
                    return cb(errorHandler.INVALID_ACCESS_TOKEN);
                }
                else if (decodedPayload.exp <= Date.now()){
                    return cb(errorHandler.ACCESS_TOKEN_EXPIRED);
                }
                else if (decodedPayload.exp <= Date.now()){
                    return cb(errorHandler.ACCESS_TOKEN_EXPIRED)
                }
                else{
                    cb(null, decodedPayload);
                }
            });
        }
    ];

    async.waterfall(tasks, next);
};

module.exports.encodeToken = encodeToken;
module.exports.decodeToken = decodeToken;
module.exports.validateToken = validateToken;