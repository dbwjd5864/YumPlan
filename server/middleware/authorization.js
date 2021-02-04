const jwt = require('jsonwebtoken');
const {promisify} = require('util');
const User = require('../models/User');

module.exports = function (req, res, next) {
  //Get token from header
  // const token = req.headers('x-auth-token');

  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  //Check if not token
  if (!token) {
    return res
      .status(401)
      .json({ status: 'fail', msg: 'No token, authorization denied' });
  }

  try {
    //entrie payload
    const decoded = await promisify(jwt.verify)(token, process.env.TOKEN_SECRET);

    const checkUser = await User.findbyId(decoded.user);
    if(!checkUser){
      res.status(401).json({ status: 'fail', msg: 'The user does no longer exist' });
    }
    

    req.user = checkUser;

    next();
  } catch (err) {
    res.status(401).json({ status: 'fail', msg: 'Token is not valid' });
  }
};
