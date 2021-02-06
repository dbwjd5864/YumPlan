const { check, validationResult } = require('express-validator');

const checkConfirmPassword = (value, { req }) => {
  if (value !== req.body.password) {
    return false;
  } else {
    return true;
  }
};

exports.signupValidators = [
  //Name validator
  check('name')
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage('Please enter your name')
    .isLength({ min: 2, max: 30 })
    .withMessage('name must be between 2 and 30 characters.'),

  //Email validator
  check('email')
    .trim()
    .normalizeEmail()
    .isEmail()
    .withMessage('Please provide a valid email')
    .not()
    .isEmpty()
    .withMessage('Please enter your email'),

  //Password validator
  check('password')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Please enter your password')
    .isLength({ min: 6 })
    .withMessage('Please enter a password with 6 or more characters'),

  //Password2 validator
  check('password2')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Please enter your confirm password')
    .custom(checkConfirmPassword)
    .withMessage('Passwords do not match'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    next();
  },
];

exports.loginValidators = [
  //Email validator
  check('email')
    .trim()
    .normalizeEmail()
    .isEmail()
    .withMessage('Please provide a valid email')
    .not()
    .isEmpty()
    .withMessage('Please enter your email'),

  //Password validator
  check('password')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Please enter your password')
    .isLength({ min: 6 })
    .withMessage('Please enter a password with 6 or more characters'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    next();
  },
];
