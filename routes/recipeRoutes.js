const express = require('express');
const recipeController = require('../controllers/recipeController.js');

const router = express.Router();

router.get('/', recipeController.getRecipes);

module.exports = router;
