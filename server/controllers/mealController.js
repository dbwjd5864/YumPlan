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
    const mealPlans = await User.findById(req.user._id)
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
    console.log(req.body);
    const newPlan = await Meal.create(req.body);

    res.status(201).json({
      status: 'success',
      mealPlan: newPlan,
    });
  } catch (err) {
    res.status(500).json({
      status: 'fail',
      err,
    });
  }
};

// @route     GET api/v1/meal/planner/weekly-plan/:week
// @desc      Get the weekly meal plan
// @access    Private
exports.getWeeklyPlan = async (req, res) => {
  const startDate = req.params.week; // 2021-02-08
  const endDate = new Date().setDate(startDate.split('-')[2] + 7);
  const userId = req.user._id;

  try {
    const weeklyPlan = await Meal.aggregate([
      {
        $match: {
          $and: [
            { user: userId },
            {
              createdAt: {
                $gte: new Date(startDate),
                $lte: new Date(endDate),
              },
            },
          ],
        },
      },
    ]);

    res.status(200).json({
      status: 'success',
      weeklyPlan,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      status: 'fail',
      err,
    });
  }
};

// @route     PUT api/v1/meal/planner/:planId
// @desc      Update meal plan
// @access    Private
exports.updateMealPlan = async (req, res) => {
  const { name, ingredients, type, tags, photo } = req.body;

  const mealFields = {};
  if (name) mealFields.name = name;
  if (ingredients) mealFields.ingredients = ingredients;
  if (type) mealFields.type = type;
  if (tags) mealFields.tags = tags;
  if (photo) mealFields.photo = photo;

  try {
    const mealPlan = await Meal.findById(req.params.planId);

    if (!mealPlan) {
      return res.status(404).json({
        msg: 'No Meal found with that ID',
      });
    }

    if (mealPlan.user.id.toString() !== req.user.id) {
      return res.status(404).json({
        msg: 'Not authorized',
      });
    }

    const updatedMealPlan = await Meal.findByIdAndUpdate(
      req.params.planId,
      { $set: mealFields },
      { new: true }
    );

    res.status(200).json({
      status: 'success',
      mealPlan: updatedMealPlan,
    });
  } catch (err) {
    res.status(500).json({
      status: 'fail',
      err,
    });
  }
};

// @route     DELETE api/v1/meal/planner/:planId
// @desc      Delete meal plan
// @access    Private
exports.deleteMealPlan = async (req, res) => {
  try {
    const mealPlan = await Meal.findById(req.params.planId);

    if (!mealPlan) {
      return res.status(404).json({
        msg: 'No Meal found with that ID',
      });
    }

    if (mealPlan.user.id.toString() !== req.user.id) {
      return res.status(404).json({
        msg: 'Not authorized',
      });
    }

    await Meal.findByIdAndRemove(req.params.planId);

    res.status(204).json({
      status: 'success',
    });
  } catch (err) {
    res.status(500).json({
      status: 'fail',
      err,
    });
  }
};
