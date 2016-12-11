'use strict';

//Initial variables
var config            = require('./config');
var express           = require('express');

//Global variables
global._              = require('lodash');
global.app            = new express();
global.logger         = require('winston');


var bodyParser        = require('body-parser');
var db                = require('./models/db.connection').database;
var expressValidator  = require('./utilities/validators');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator);

var server = app.listen(config.port , function(){
  logger.info('Listening on port %d' , server.address().port);
});

// IMPORTANT - Declare route after initiate everything
var routes            = require('./routes');