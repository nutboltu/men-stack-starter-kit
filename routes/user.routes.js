'use strict';

var userController      = require('../controllers/user.controller');
var userValidator       = require('../utilities/validators/user.validator');

app.post('/user/register',[userValidator.register, userController.register])
    .post('/user/login' , [userValidator.login,  userController.login])
    .post('/user/findById' , [ userController.findById])
    .get('/user/find-all' , [ userController.findAll]);
