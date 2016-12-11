'use strict';

var async           = require('async');
var errorHandler    = require('../../utilities/helpers/error.handler');
var hashHelper      = require('../../utilities/helpers/hash.helper');
var jwtHelper       = require('../../utilities/helpers/jwt.token.helper');
var moment         = require('moment');
var userModel       = require('../models').Models.userModel;

var add = function(newUser, cb){

    var tasks = [

        function(next){
            findByEmail(newUser.email, function(err, userExists){
                if(err){
                    logger.error(errorHandler.INTERNAL_DB_ERROR.message, newUser.email);
                    return next(errorHandler.INTERNAL_DB_ERROR);
                }
                else if(userExists) {
                    return next(errorHandler.EMAIL_EXISTS);
                }
                else next();
            });

        },
        function(next){

            hashHelper.hashIt(newUser.password, function(err, hashedPassword){
                if(err){
                    logger.error('Failed to hash  password for', newUser.email);
                    return next(errorHandler.INTERNAL_SERVER_ERROR);
                }
                else next(err, hashedPassword);
            });
        },
        function(hashedPassword, next){

            var user = new userModel();
            user.firstName = newUser.firstName;
            user.lastName = newUser.lastName;
            user.email = newUser.email;
            user.password = hashedPassword;

            user.save(function(err, newUser){
                if(err){
                    logger.error(errorHandler.INTERNAL_DB_ERROR.message, newUser.email);
                    return next(errorHandler.INTERNAL_DB_ERROR);
                }
                else next(err, newUser ? newUser.toObject(): null);
            });

        }
    ];
    async.waterfall(tasks , cb);
};

var findAll = function(offset, limit, cb){
    userModel.find()
        .skip(offset)
        .limit(limit)
        .exec(function (err, users) {
            if(err){
                logger.error(errorHandler.INTERNAL_DB_ERROR.message);
                cb(errorHandler.INTERNAL_DB_ERROR)
            }
            else cb(err, users);
        })
};

var findById = function(id, cb){
    userModel.findOne({
        _id: id
    },function(err, user){
        if(err){
            logger.error(errorHandler.INTERNAL_DB_ERROR.message);
            cb(errorHandler.INTERNAL_DB_ERROR);
        }
        else cb(err, user);
    })
};

var remove = function(id, cb){
    userModel.remove({_id: id}, function(err, removed){
        if(err){
            logger.error(errorHandler.INTERNAL_DB_ERROR.message);
            cb(errorHandler.INTERNAL_DB_ERROR);
        }
        else cb(err, removed);
    })
};

var update = function(id, user, cb){

    userModel.findByIdAndUpdate( id,
    {
        $set: {
        firstName: user.firstName,
        lastName: user.lastName
        }
    },{
        new: true
    }, function(err, s){
         if(err){
             logger.error(errorHandler.INTERNAL_DB_ERROR.message);
             cb(errorHandler.INTERNAL_DB_ERROR);
         }
         else{
            cb(err, s);
         }
    });
};

module.exports = {
    add: add,
    findAll: findAll,
    findById: findById,
    remove: remove,
    update: update
};

