'use strict';

var version              = require('../config').version;
var userController      = require('../controllers/user.controller');
var userValidator       = require('../utilities/validators/user.validator');

app.post('/api/'+version+'/users',[userValidator.add, userController.add])
    .put('/api/'+version+'/users/:id',[userValidator.add, userController.update])
    .get('/api/'+version+'/users/:offset/:limit', [userValidator.hasValidToken, userController.findAll])
    .get('/api/'+version+'/users/:id', [userValidator.hasValidToken, userController.findById])
    .delete('/api/'+version+'/users/:id', [userValidator.hasValidToken, userController.remove]);
