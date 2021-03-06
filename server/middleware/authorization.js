const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const User = require('../models/User');

module.exports = async function (req, res, next) {
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
    return res.status(401).json({ status: 'fail', msg: 'Please Log In first' });
  }

  try {
    //entrie payload
    const decoded = await promisify(jwt.verify)(
      token,
      process.env.TOKEN_SECRET
    );

    const currentUser = await User.findById(decoded.user);
    if (!currentUser) {
      res
        .status(401)
        .json({ status: 'fail', msg: 'The user does no longer exist' });
    }

    req.user = currentUser;

    next();
  } catch (err) {
    res.status(401).json({ status: 'fail', msg: 'Token is not valid' });
  }
};
