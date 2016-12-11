'use strict';

var responseHelper = require('../utilities/helpers/response.helper');
var userModelHandler = require('../models/handlers/user.model.handler');

var add = function (req, res) {

    userModelHandler.add(req.body, function (err, user) {
        responseHelper.send(err, user, res);
    });
};

var findAll = function (req, res) {

    var offset = req.params.offset || 0;
    var limit = req.params.limit || 10;
    userModelHandler.findAll(offset, limit, function (err, users) {
        responseHelper.send(err, users, res);
    });
};

var findById = function (req, res) {
    userModelHandler.findById(req.params.id, function (err, user) {
        responseHelper.send(err, user, res);
    });
};


var remove = function (req, res) {

    userModelHandler.remove(req.params.id, function (err, removed) {
        responseHelper.send(err, removed, res);
    });
};

var update = function (req, res) {
    userModelHandler.update(req.params.id, req.body, function (err, user) {
        responseHelper.send(err, user, res);
    });
};

module.exports = {
    add: add,
    findAll: findAll,
    findById: findById,
    remove: remove,
    update: update
};
