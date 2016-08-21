'use strict';

var ACCESS_TOKEN_EXPIRED =  new Error('Access token has expired');
var EMAIL_EXISTS = new Error('Email address already exists');
var INCORRECT_EMAIL = new Error('Incorrect email address');
var INTERNAL_SERVER_ERROR = new Error('Internal server error');
var INTERNAL_DB_ERROR = new Error('Internal database error');
var INVALID_ACCESS_TOKEN = new Error('Invalid access token');
var NO_CATEGORY = new Error('No category found');
var NO_FRIEND = new Error('No friend found');
var NO_USER = new Error('No user found');
var PASSWORD_MISMATCH = new Error('Password mismatch');


//code
ACCESS_TOKEN_EXPIRED.code   = 400;
EMAIL_EXISTS.code           = 400;
INCORRECT_EMAIL.code        = 400;
INTERNAL_SERVER_ERROR.code  = 500;
INTERNAL_DB_ERROR.code      = 500;
INVALID_ACCESS_TOKEN.code   = 400;
NO_CATEGORY.code            = 404;
NO_FRIEND.code              = 404;
NO_USER.code                = 404;
PASSWORD_MISMATCH.code      = 400;


module.exports = {
    ACCESS_TOKEN_EXPIRED:  ACCESS_TOKEN_EXPIRED,
    EMAIL_EXISTS: EMAIL_EXISTS,
    INCORRECT_EMAIL: INCORRECT_EMAIL,
    INTERNAL_SERVER_ERROR: INTERNAL_SERVER_ERROR,
    INTERNAL_DB_ERROR: INTERNAL_DB_ERROR,
    INVALID_ACCESS_TOKEN: INVALID_ACCESS_TOKEN,
    NO_CATEGORY: NO_CATEGORY,
    NO_FRIEND: NO_FRIEND,
    NO_USER: NO_USER,
    PASSWORD_MISMATCH: PASSWORD_MISMATCH
};