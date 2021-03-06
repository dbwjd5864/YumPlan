const Meal = require('../models/Meal');
const User = require('../models/User');

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

// @route     PATCH api/v1/meal/:mealId
// @desc      Increase like count
// @access    Public
exports.increaseLike = async (req, res) => {
  const likeStatus = req.query.like;

  try {
    const mealPlan = await Meal.findById(req.params.mealId);
    let updatedMeal;

    if (!mealPlan) {
      return res.status(404).json({
        msg: 'No Meal found with that ID',
      });
    }

    if (likeStatus === 'like') {
      updatedMeal = await Meal.findByIdAndUpdate(
        req.params.mealId,
        { likeCount: mealPlan.likeCount + 1 },
        { new: true }
      );
    } else if (likeStatus == 'unlike') {
      updatedMeal = await Meal.findByIdAndUpdate(
        req.params.mealId,
        { likeCount: mealPlan.likeCount - 1 },
        { new: true }
      );
    }

    res.status(200).json({
      status: 'success',
      updatedMeal,
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
  const { name, ingredients, type, tags, photo, createdAt, user } = req.body;

  const mealFields = {};
  if (name) mealFields.name = name;
  if (ingredients) mealFields.ingredients = ingredients;
  if (type) mealFields.type = type;
  if (tags) mealFields.tags = tags;
  if (photo) mealFields.photo = photo;
  if (createdAt) mealFields.createdAt = createdAt;
  if (user) mealFields.user = req.user._id;

  try {
    const newPlan = await Meal.create(mealFields);

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
  const startDate = new Date(req.params.week); // 2021-02-08
  let endDate = new Date(startDate);
  endDate = endDate.setDate(startDate.getDate() + 7);
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
                $lt: new Date(endDate),
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
  const { name, ingredients, type, tags, photo, createdAt } = req.body;

  const mealFields = {};
  if (name) mealFields.name = name;
  if (ingredients) mealFields.ingredients = ingredients;
  if (type) mealFields.type = type;
  if (tags) mealFields.tags = tags;
  if (photo) mealFields.photo = photo;
  if (createdAt) mealFields.createdAt = createdAt;

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

// @route     PATCH api/v1/meal/:mealId
// @desc      Update like count
// @access    Public
exports.updateLike = async (req, res) => {
  const likeStatus = req.query.like;

  try {
    const mealPlan = await Meal.findById(req.params.mealId);
    let updatedMeal;

    if (!mealPlan) {
      return res.status(404).json({
        msg: 'No Meal found with that ID',
      });
    }

    if (likeStatus === 'like') {
      updatedMeal = await Meal.findByIdAndUpdate(
        req.params.mealId,
        { likeCount: mealPlan.likeCount + 1 },
        { new: true }
      );
    } else if (likeStatus == 'unlike') {
      updatedMeal = await Meal.findByIdAndUpdate(
        req.params.mealId,
        { likeCount: mealPlan.likeCount - 1 },
        { new: true }
      );
    }

    res.status(200).json({
      status: 'success',
      updatedMeal,
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

// @route     GET api/v1/meal/favorites
// @desc      Get all favorites
// @access    Private
exports.getFavorites = async (req, res) => {
  try {
    const favorites = await User.findById(req.user._id)
      .select({ favorites: 1 })
      .populate('favorites');

    res.status(200).json({
      status: 'success',
      favorites: favorites.favorites,
    });
  } catch (err) {
    res.status(500).json({
      status: 'fail',
      err,
    });
  }
};

// @route     PATCH api/v1/meal/:mealId/favorites
// @desc      Add meal to favorite
// @access    Private
exports.addFavorite = async (req, res) => {
  try {
    const meal = await Meal.findById(req.params.mealId);
    const favList = await User.findOne({ favorites: req.params.mealId });

    if (!meal) {
      return res.status(404).json({
        msg: 'No Meal found with that ID',
      });
    }
    if (favList) {
      return res.status(400).json({
        status: 'fail',
        msg: 'Already added',
      });
    }

    const favorite = await User.findByIdAndUpdate(
      req.user._id,
      { $push: { favorites: meal._id } },
      { new: true }
    )
      .populate('favorites')
      .select({ name: 0, email: 0, date: 0, __v: 0 })
      .slice('favorites', -1);

    res.status(200).json({
      status: 'success',
      favorite,
    });
  } catch (err) {
    res.status(500).json({
      status: 'fail',
      err,
    });
  }
};

// @route     PATCH api/v1/meal/favorites/:favoriteId
// @desc      Update favorite
// @access    Private
exports.updateFavorite = async (req, res) => {
  try {
    const favorite = await User.findOneAndUpdate(
      { favorites: req.params.favoriteId },
      { $pull: { favorites: req.params.favoriteId } },
      { new: true }
    )
      .populate('favorites')
      .select({ name: 0, email: 0, date: 0, __v: 0 });

    if (!favorite) {
      return res.status(404).json({
        msg: 'No Meal found with that ID',
      });
    }

    res.status(200).json({
      status: 'success',
      favorite,
    });
  } catch (err) {
    res.status(500).json({
      status: 'fail',
      err,
    });
  }
};
