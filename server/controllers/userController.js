const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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
    data: {
      user,
    },
  });
};

// @route     POST api/v1/users/signup
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
    console.log(err.message);
    res.status(400).json({
      status: 'fail',
    });
  }
};

// @route     POST api/v1/users/login
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
