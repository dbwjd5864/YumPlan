import axios from 'axios';

// User API
const userUrl = '/api/v1/user';

export const isLoggedIn = () => axios.get(`${userUrl}`);

export const signup = (newUser) => axios.post(`${userUrl}/signup`, newUser);

export const login = (user) => axios.post(`${userUrl}/login`, user);

export const logout = () => axios.get(`${userUrl}/logout`);

///////////////////////////
// Meal API
const mealUrl = '/api/v1/meal';

export const getAllMeals = () => axios.get(`${mealUrl}`);

export const updateLikeCount = (mealId, updateLike) =>
  axios.patch(`${mealUrl}/${mealId}?like=${updateLike}`);

export const getMealPlanner = () => axios.get(`${mealUrl}/planner`);

export const getWeeklyPlanner = (week) =>
  axios.get(`${mealUrl}/planner/weekly-plan/${week}`, {
    withCredentials: true,
  });

export const createMealPlan = (mealPlan) =>
  axios.post(`${mealUrl}/planner`, mealPlan);

export const updateMealPlan = (mealId, updatedMealPlan) =>
  axios.patch(`${mealUrl}/planner/${mealId}`, updatedMealPlan, {
    withCredentials: true,
  });

export const deleteMealPlan = (mealId) =>
  axios.delete(`${mealUrl}/planner/${mealId}`);

// Meal Favorite

export const getAllFavorites = () => axios.get(`${mealUrl}/favorites`);
export const addFavorite = (mealId) =>
  axios.patch(`${mealUrl}/${mealId}/favorites`);
export const updateFavorite = (favoriteId) =>
  axios.patch(`${mealUrl}/favorites/${favoriteId}`);
