const express = require('express');
const auth = require('../middleware/authorization');
const mealController = require('../controllers/mealController.js');

const router = express.Router();

router.get('/', mealController.getAllMeals);

// Protect router
router.use(auth);
router
  .route('/planner')
  .get(mealController.getPlanner)
  .post(mealController.createMealPlan);

router.get('/planner/weekly-plan/:week', mealController.getWeeklyPlan);

router
  .route('/planner/:planId')
  .patch(mealController.updateMealPlan)
  .delete(mealController.deleteMealPlan);

module.exports = router;
