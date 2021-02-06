const express = require('express');
const {
  signupValidators,
  loginValidators,
} = require('../validatation/validator');

const { login, signup, logout } = require('../controllers/userController');

const router = express.Router();

router.post('/signup', signupValidators, signup);
router.post('/login', loginValidators, login);
router.get('/logout', logout);

module.exports = router;
