import axios from 'axios';

// User API
const userUrl = 'https://yumplan.herokuapp.com/api/v1/user';
const proxy = '/api/v1/user';

export const isLoggedIn = () => axios.get(`${proxy}`);

export const signup = (newUser) => axios.post(`${proxy}/signup`, newUser);

export const login = (user) => axios.post(`${proxy}/login`, user);

export const logout = () => axios.get(`${proxy}/logout`);

///////////////////////////
// Meal API
const mealUrl = 'https://yumplan.herokuapp.com/api/v1/meal';
const mealProxy = '/api/v1/meal';

export const getAllMeals = () => axios.get(`${mealProxy}`);

export const updateLikeCount = (mealId, updateLike) =>
  axios.patch(`${mealProxy}/${mealId}?like=${updateLike}`);

export const getMealPlanner = () => axios.get(`${mealProxy}/planner`);

export const getWeeklyPlanner = (week) =>
  axios.get(`${mealProxy}/planner/weekly-plan/${week}`);

export const createMealPlan = (mealPlan) =>
  axios.post(`${mealProxy}/planner`, mealPlan);

export const updateMealPlan = (mealId, updatedMealPlan) =>
  axios.patch(`${mealProxy}/planner/${mealId}`, updatedMealPlan);

export const deleteMealPlan = (mealId) =>
  axios.delete(`${mealProxy}/planner/${mealId}`);

// Meal Favorite

export const getAllFavorites = () => axios.get(`${mealProxy}/favorites`);
export const addFavorite = (mealId) =>
  axios.patch(`${mealProxy}/${mealId}/favorites`);
export const updateFavorite = (favoriteId) =>
  axios.patch(`${mealProxy}/favorites/${favoriteId}`);
