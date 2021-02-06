// @route     GET api/v1/meal
// @desc      Get all meal ideas from all users
// @access    Public
exports.getAllMeals = async (req, res) => {};

// @route     GET api/v1/meal/planner
// @desc      Show Meal Planner
// @access    Private
exports.getPlanner = async (req, res) => {};

// @route     POST api/v1/meal/planner
// @desc      Add new meal plan
// @access    Private
exports.uploadMealPlan = async (req, res) => {};

// @route     PUT api/v1/meal/planner/:planId
// @desc      Update meal plan
// @access    Private
exports.updateMealPlan = async (req, res) => {};

// @route     DELETE api/v1/meal/planner/:planId
// @desc      Delete meal plan
// @access    Private
exports.deleteMealPlan = async (req, res) => {};
