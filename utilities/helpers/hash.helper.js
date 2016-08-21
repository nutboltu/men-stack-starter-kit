'use strict';

var bcrypt      = require('bcrypt');
var saltRounds  = 8;  //rounds=8 : ~40 hashes/sec

var compareIt = function(password, hashedPassword, callback){
    bcrypt.compare(password, hashedPassword, callback);
};

var hashIt = function(text, callback){

    bcrypt.hash(text, saltRounds , callback);
};

module.exports.compareIt = compareIt;
module.exports.hashIt = hashIt;
