'use strict';

var allowCrossDomain = function (req, res, next) {

    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    /**
     * You can allow other headers Ex: Authorization
     */
    res.header('Access-Control-Allow-Headers', 'Content-Type, x-access-token');
    next();

};
app.use(allowCrossDomain);

var userRouter = require('./user.routes');
