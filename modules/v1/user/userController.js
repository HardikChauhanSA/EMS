'use strict';
const passwordHash = require('password-hash');
const moment = require('moment');
const _ = require('lodash');

const jwt = require('../../../helper/jwt');
const User = require('./userModel');

const userCtr = {};

userCtr.test = function (req, res) {
  res.json({ message: "Test api working." })
};

userCtr.register = function (req, res) {

  var registerUser = new User(req.body);
  console.log(req.body);

  registerUser.save(function (err, register) {

    if (err) {
      if (11000 == err.code)
        res.json({ message: 'User already registered with this email.please provide another user email' });
      else
        res.send(err);
      res.end();
    }
    else {
      res.json({ message: 'User added succesfully' })
    }
  });

};

userCtr.login = function (req, res) {


  User.findOne({
    email: req.body.email
  }, function (err, user) {
    if (err) throw err;

    if (!user) {
      return res.status(401).json({ messaAge: 'User does not exist' });
    }
    else if (!user.comparePassword(req.body.password)) {
      return res.status(401).json({ message: 'Authentication failed. Invalid user or password.' });
    }

    return res.json({ user, access_token: jwt.sign({ email: user.email, fullName: user.fullName, _id: user._id }, 'supersecret'), status: "ok" });

  });
};


userCtr.loginRequired = function (req, res, next) {
  console.log("login required");
  if (req.user) {
    next();
  } else {
    return res.status(401).json({ message: 'Unauthorized user!' });
  }
};

module.exports = userCtr;