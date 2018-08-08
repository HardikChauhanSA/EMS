'use strict';

var express = require('express');
var user = require('./userController');
const middleware = require('../../../middleware');
const userMiddleware = require('./userMiddleware');
const validationRules = require('./userValidationRules');

var userRouter = express.Router()
// Inject Validation Rules
userRouter.use((req, res, next) => {
    if (req.method !== 'OPTIONS') {
        req.validations = validationRules.get(req.path);
        middleware.reqValidator(req, res, next);
    } else {
        next();
    }
});

userRouter.get('/test', user.test)

userRouter.post('/register', user.register)

userRouter.post('/login', user.login)

module.exports = userRouter;