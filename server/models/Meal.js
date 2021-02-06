import mongoose from 'mongoose';

const MealSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  ingredients: {
    type: [String],
    required: true,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
  type: {
    type: String,
    enum: ['public', 'private'],
    default: 'private',
  },
  tags: [String],
  photo: {
    type: String,
    default: 'spoon.png',
  },
  likeCount: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Meal', MealSchema);
