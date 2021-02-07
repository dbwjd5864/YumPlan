const Meal = require('./../models/Meal');
const User = require('./../models/User');

// @route     GET api/v1/meal
// @desc      Get all meal ideas from all users
// @access    Public
exports.getAllMeals = async (req, res) => {
  try {
    const meals = await Meal.find();

    res.status(200).json({
      status: 'success',
      meals,
    });
  } catch (err) {
    res.status(500).json({
      status: 'fail',
      err,
    });
  }
};

// @route     GET api/v1/meal/planner
// @desc      Show Meal Planner
// @access    Private
exports.getPlanner = async (req, res) => {
  try {
    const mealPlans = await await User.findById(req.user._id)
      .select({ mealPlan: 1 })
      .populate('mealPlan');

    res.status(200).json({
      status: 'success',
      mealPlans,
    });
  } catch (err) {
    res.status(500).json({
      status: 'fail',
      err,
    });
  }
};

// @route     POST api/v1/meal/planner
// @desc      Add new meal plan
// @access    Private
exports.createMealPlan = async (req, res) => {
  if (!req.body.user) {
    req.body.user = req.user._id;
  }

  try {
    const newPlan = await Meal.create(req.body);

    res.status(201).json({
      status: 'success',
      plan: newPlan,
    });
  } catch (err) {
    res.status(500).json({
      status: 'fail',
      err,
    });
  }
};

// @route     PUT api/v1/meal/planner/:planId
// @desc      Update meal plan
// @access    Private
exports.updateMealPlan = async (req, res) => {};

// @route     DELETE api/v1/meal/planner/:planId
// @desc      Delete meal plan
// @access    Private
exports.deleteMealPlan = async (req, res) => {};
