const jwt = require('jwt-simple');


const jwtUtil = {};

jwtUtil.getAuthToken = (data) => {
  return jwt.encode(data, process.env.JwtSecret);
};

jwtUtil.decodeAuthToken = (token) => {
  if (token) {
    try {
      return jwt.decode(token, process.env.JwtSecret);
    } catch (err) {
     
      return false;
    }
  }
  return false;
};

module.exports = jwtUtil;
