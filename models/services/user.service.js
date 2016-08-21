'use strict';

var async           = require('async');
var errorHandler    = require('../../utilities/helpers/error.handler');
var hashHelper      = require('../../utilities/helpers/hash.helper');
var jwtHelper       = require('../../utilities/helpers/jwt.token.helper');
var moment         = require('moment');
var userModel       = require('../models').Models.userModel;

function getUserInfo(user){
  return   {
      _id: user._id || user.id,
      name: user.firstName+' '+ user.lastName,
      firstName: user.firstName,
      lastName: user.lastName,
      avatar: user.avatar,
      email: user.email
  };
}

var findAll = function(query, callback){
    userModel.find({
        $or: [
            {'firstName': {"$regex": query.search, "$options": "i" } },
            {'lastName': {"$regex": query.search, "$options": "i" } },
            {'email': {"$regex": query.search, "$options": "i" }}
        ]

    },function(err, users){
        callback(null, users);
    })
};

var findById = function(userId, callback){
    userModel.findOne({
        _id: userId
    },function(err, user){
        var userInfo = getUserInfo(user);
        callback(null, userInfo);
    })
};

var findByEmail = function(email, callback){
    userModel.findOne({
        email: email
    },function(err, user){
        if(err){
            callback(errorHandler.INTERNAL_DB_ERROR);
        }
        else if(user){
            var userInfo = getUserInfo(user);
            callback(null, userInfo);
        }
        else callback();

    })
};

var findByEmailWithPassword = function(email, callback){
    userModel.findOne({
        email: email
    }).select('+password').lean().exec(callback);
};

var login = function(email, password, callback){

    var userInfo,token;
    var tasks = [

        function(next){
            findByEmailWithPassword(email, function(err, user){
                if(err){
                    logger.error('Failed to find user', email);
                    return next(errorHandler.INTERNAL_DB_ERROR);
                }
                else if(user)  next(err, user);
                else{
                    logger.error('Incorrect email.No user found', email);
                    return next(errorHandler.INCORRECT_EMAIL);
                }
            });
        },
        function(user, next){

            hashHelper.compareIt(password, user.password, function(err, isMatched){
                if(err){
                    logger.error('Failed to compare  password for', email);
                    return next(errorHandler.INTERNAL_SERVER_ERROR);
                }
                else next (err, isMatched, user);
            });
        },
        function(isMatched, user, next){

            if(isMatched){
                userInfo = user;
                var planToken = {
                    iss: user.id,
                    exp: moment().add(7,'days').valueOf()
                };

                jwtHelper.encodeToken(planToken, function(err, encryptedToken){
                    if(err){
                        logger.error('Failed to encrypt token', email);
                        return next(errorHandler.INTERNAL_SERVER_ERROR);
                    }
                    else{
                        
                        var userData = {
                            userInfo: getUserInfo(userInfo),
                            token: encryptedToken
                        };
                        next(null, userData);
                    }

                });
            }
            else return next(errorHandler.PASSWORD_MISMATCH);

        }];

    async.waterfall(tasks, callback);
};

var register = function(data, callback){
    var tasks = [

        function(next){
            findByEmail(data.email, function(err, userExists){
                if(err){
                    logger.error('Failed to find user', data.email);
                    return next(errorHandler.INTERNAL_DB_ERROR);
                }
                else next(err, userExists);
            });

        },function(userExists, next){
            if(userExists){
                return next(errorHandler.EMAIL_EXISTS);
            }
            else next(null);
        },
        function(next){

            hashHelper.hashIt(data.password, function(err, hashedPassword){
                if(err){

                    logger.error('Failed to hash  password for', data.email);
                    return next(errorHandler.INTERNAL_SERVER_ERROR);
                }
                else next(err, hashedPassword);
            });
        },
        function(hashedPassword, next){

            var user = new userModel();
            user.firstName = data.firstName;
            user.lastName = data.lastName;
            user.email = data.email;
            user.password = hashedPassword;

            user.save(function(err, newUser){
                if(err){
                    logger.error('Failed to save new user', data.email);
                    return next(errorHandler.INTERNAL_DB_ERROR);
                }
                else next(err, newUser ? newUser.toObject(): null);
            });

        }
    ];

    async.waterfall(tasks , callback);
};


module.exports.findAll = findAll;
module.exports.findById = findById;
module.exports.findByEmail = findByEmail;
module.exports.findByEmailWithPassword = findByEmailWithPassword;
module.exports.login = login;
module.exports.register = register;

