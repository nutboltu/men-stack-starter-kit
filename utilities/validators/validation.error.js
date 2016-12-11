/**
 * @author Farhad Yasir
 */
'use strict';

var errorHandler = require('../helpers/error.handler');

var processErrors = function(req, res, next){

    var validationErrors = req.validationErrors();
    if(validationErrors){
        logger.error(validationErrors);
        var error = errorHandler[validationErrors[0].msg] || errorHandler.INVALID_PARAMETER;
        res.status(error.code).json(error.message);
    }
    else next();
};

module.exports = {
    processErrors: processErrors
};