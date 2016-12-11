'use strict';

var dbConfig              = require('../config').db;
var Promise             = require('bluebird');
var mongoose            = new Promise.promisifyAll(require('mongoose'));

var connectionString    = 'mongodb://' + dbConfig.host + ':' + dbConfig.port + '/' + dbConfig.dbName;


module.exports.database = mongoose.connect(connectionString, function(err){
    if(err){
        logger.error('Error connecting to MongoDB: ', err);
    }
    else logger.info('Successfully connected to MongoDB')
});