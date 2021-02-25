import axios from 'axios';

// User API
const userUrl = 'https://yumplan.herokuapp.com/api/v1/user';
// const userProxy = '/api/v1/user';

export const isLoggedIn = () =>
  axios.get(`${userUrl}`, { withCredentials: true });

export const signup = (newUser) =>
  axios.post(`${userUrl}/signup`, newUser, { withCredentials: true });

export const login = (user) =>
  axios.post(`${userUrl}/login`, user, { withCredentials: true });

export const logout = () => axios.get(`${userUrl}/logout`);

///////////////////////////
// Meal API
const mealUrl = 'https://yumplan.herokuapp.com/api/v1/meal';
// const mealProxy = '/api/v1/meal';

export const getAllMeals = () => axios.get(`${mealUrl}`);

export const updateLikeCount = (mealId, updateLike) =>
  axios.patch(`${mealUrl}/${mealId}?like=${updateLike}`);

export const getMealPlanner = () =>
  axios.get(`${mealUrl}/planner`, { withCredentials: true });

export const getWeeklyPlanner = (week) =>
  axios.get(`${mealUrl}/planner/weekly-plan/${week}`, {
    withCredentials: true,
  });

export const createMealPlan = (mealPlan) =>
  axios.post(`${mealUrl}/planner`, mealPlan, { withCredentials: true });

export const updateMealPlan = (mealId, updatedMealPlan) =>
  axios.patch(`${mealUrl}/planner/${mealId}`, updatedMealPlan, {
    withCredentials: true,
  });

export const deleteMealPlan = (mealId) =>
  axios.delete(`${mealUrl}/planner/${mealId}`, { withCredentials: true });

// Meal Favorite

export const getAllFavorites = () =>
  axios.get(`${mealUrl}/favorites`, { withCredentials: true });
export const addFavorite = (mealId) =>
  axios.patch(`${mealUrl}/${mealId}/favorites`, { withCredentials: true });
export const updateFavorite = (favoriteId) =>
  axios.patch(`${mealUrl}/favorites/${favoriteId}`, { withCredentials: true });
