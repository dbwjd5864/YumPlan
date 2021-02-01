const { check, validationResult } = require('express-validator');

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
