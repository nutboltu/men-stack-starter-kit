/**
 * @author Farhad Yasir
 */
'use strict';

module.exports = {
    transform: function(doc, ret, options) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        return ret;
    }
};