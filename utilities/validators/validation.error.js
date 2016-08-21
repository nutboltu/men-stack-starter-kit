/**
 * @author Farhad Yasir
 */
'use strict';

var errorResponse = require('../helpers/enums').errorResponse;

var processErrors = function(req, res, next){

    var validationErrors = req.validationErrors();
    if(validationErrors){
        logger.error(errorResponse.INVALID_PARAMETER.message);
        res.status(400).json(errorResponse.INVALID_PARAMETER);
    }
    else next();
};

module.exports.processErrors = processErrors;