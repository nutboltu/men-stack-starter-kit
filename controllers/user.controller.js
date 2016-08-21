'use strict';

var responseHelper = require('../utilities/helpers/response.helper');
var userService = require('../models/services//user.service');


var findAll = function (req, res) {

    userService.findAll(req.query, function (err, users) {
        responseHelper.send(err, users, res);
    });
};

var findById = function (req, res) {
    userService.findById(req.body.userId, function (err, user) {
        responseHelper.send(err, user, res);
    });
};

var login = function (req, res) {

    userService.login(req.body.email, req.body.password, function (err, data) {
        responseHelper.send(err, data, res);
    });
};

var register = function (req, res) {

    userService.register(req.body, function (err, user) {
        responseHelper.send(err, user, res);
    });
};

module.exports.findAll = findAll;
module.exports.findById = findById;
module.exports.login = login;
module.exports.register = register;
