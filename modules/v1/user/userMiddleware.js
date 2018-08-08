const _ = require('lodash');
const constants = require('../../../helper/constants');
const jwt = require('../../../helper/jwt.js');
const User = require('./userModel.js');

const middleware = {};

middleware.loadUser = (req, res, next) => {
  const { headers, byPassRoutes } = req;
  if (!_.isEmpty(byPassRoutes)) {
    if (_.includes(byPassRoutes, req.path)) {
      next();
      return;
    }
  }

  if (_.isEmpty(headers.authorization)) {
    res.status(401).json({ error: req.t('ERR_UNAUTH') });
  } else {
    const decoded = jwt.decodeAuthToken(headers.authorization.replace('Bearer ', ''));
    if (decoded) {
      User.findOne({ _id: decoded.id })
        .then((user) => {
          if (user) {
            if (!constants.user.statuses.Active.is(user.status)) {
              res.status(401).json({ error: req.t('ERR_USER_BLOCKED') });
            } else {
              req.user = user;
              next();
            }
          } else {
            res.status(401).json({ error: req.t('ERR_TOKEN_EXP') });
          }
        })
        .catch((err) => {
          logger.error(err);
          res.status(401).json({ error: req.t('ERR_TOKEN_EXP') });
        });
      req.user = decoded;
    } else {
      res.status(401).json({ error: req.t('TOKEN_EXP') });
    }
  }
};

module.exports = middleware;
