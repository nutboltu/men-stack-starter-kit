'use strict';

//Initial variables
var config            = require('./config/config');
var env               = process.env.NODE_ENV || 'development';
var express           = require('express');

//Global variables
global._              = require('lodash');
global.app            = new express();
global.logger         = require('winston');


var bodyParser        = require('body-parser');
var cookieParser      = require('cookie-parser');
var db                = require('./models/db.connection').database;
var expressValidator  = require('express-validator');
var path              = require('path');


//Set view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


var server = app.listen(config[env].port , function(){

  logger.info('Listening on port %d' , server.address().port);
});

socket.extends(server);

// IMPORTANT - Declare route after initiate everything
var routes            = require('./routes');