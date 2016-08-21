'use strict';

var config              = require('../config/config');
var env                 = process.env.NODE_ENV || 'development';
var Promise             = require('bluebird');
var mongoose            = new Promise.promisifyAll(require('mongoose'));

var dbConfig            = config[env].db;
var connectionString    = 'mongodb://' + dbConfig.host + ':' + dbConfig.port + '/' + dbConfig.dbName;


module.exports.database = mongoose.connect(connectionString, function(err){
    if(err){
        logger.error('Error connecting to MongoDB: ', err);
    }
    else logger.info('Successfully connected to MongoDB')
});