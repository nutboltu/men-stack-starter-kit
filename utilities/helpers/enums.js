'use strict';

var errorResponse = {
    PERMISSION_DENIED: {
        error: true,
        code: 400,
        message: 'Permission denied'
    },
    INVALID_PARAMETER: {
        error: true,
        code: 500,
        message: 'Invalid parameter'
    }
};

var status = {
    active: 'active',
    inactive: 'inactive',
    pending: 'pending',
    deleted: 'deleted'
};

module.exports.errorResponse    = errorResponse;
module.exports.status           = status;