const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');

const createSendToken = (user, statusCode, req, res) => {
  const token = jwt.sign({ user: user._id }, process.env.TOKEN_SECRET, {
    expiresIn: 3600,
  });
  const cookieOption = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === 'production') {
    cookieOption.secure = true;
  }

  res.cookie('jwt', token, cookieOption);

  // Remove password from output
  user.password = undefined;

  res.status(statusCode).json({
    status: 'success',
    token,
    user,
  });
};

// @route     POST api/v1/user/signup
// @desc      Register a user
// @access    Public
exports.signup = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    //Check if the user/email is already in the database
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        msg: 'Email already exists',
      });
    }

    //Create a new user
    user = new User({
      name,
      email,
      password,
    });

    //Hash password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    const savedUser = await user.save();

    createSendToken(savedUser, 201, req, res);
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      err,
    });
  }
};

// @route     POST api/v1/user/login
// @desc      Auth user and get Token
// @access    Public
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    //Check if the email exists
    const user = await User.findOne({ email }).select('+password');
    if (!user || !(await user.correctPassword(password, user.password))) {
      return res.status(401).json({
        msg: 'Incorrect email or password',
      });
    }

    createSendToken(user, 200, req, res);
  } catch (err) {
    res.status(500).json({
      status: 'fail',
      err,
    });
  }
};

// @route     GET api/v1/user/logout
// @desc      log out and clear cookie
// @access    Public
exports.logout = (req, res) => {
  res.cookie('jwt', 'loggedout', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.status(200).json({ status: 'success' });
};

// For checking the user is logged in
exports.isLoggedIn = async (req, res, next) => {
  if (req.cookies.jwt) {
    try {
      // 1) verify token
      const decoded = await promisify(jwt.verify)(
        req.cookies.jwt,
        process.env.JWT_SECRET
      );

      // 2) Check if user still exists
      const currentUser = await User.findById(decoded.id);
      if (!currentUser) {
        return next();
      }

      // 3) Check if user changed password after the token was issued
      if (currentUser.changedPasswordAfter(decoded.iat)) {
        return next();
      }

      // THERE IS A LOGGED IN USER
      res.locals.user = currentUser;
      return next();
    } catch (err) {
      return next();
    }
  }
  next();
};
