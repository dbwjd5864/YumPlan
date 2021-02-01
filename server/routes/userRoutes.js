const express = require('express');
const {
  signupValidators,
  loginValidators,
} = require('../validatation/validator');

const { login, signup } = require('../controllers/userController');

const router = express.Router();

router.post('/signup', signupValidators, signup);
router.post('/login', loginValidators, login);

module.exports = router;
