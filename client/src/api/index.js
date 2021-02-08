import axios from 'axios';

// User API
const userUrl = '/api/v1/user';

export const signup = (newUser) => axios.post(`${userUrl}/signup`, newUser);

export const login = (user) => axios.post(`${userUrl}/login`, user);

export const logout = () => axios.get(`${userUrl}/logout`);

///////////////////////////
// Meal API
const mealUrl = '/api/v1/meal';

export const getAllMeals = () => axios.get(`${mealUrl}`);

export const getMealPlanner = () => axios.get(`${mealUrl}/planner`);

export const createMealPlan = (mealPlan) =>
  axios.post(`${mealUrl}/planner`, mealPlan);

export const updateMealPlan = (mealId, updatedMealPlan) =>
  axios.patch(`${mealUrl}/planner/${mealId}`, updatedMealPlan);

export const deleteMealPlan = (mealId) =>
  axios.delete(`${mealUrl}/planner/${mealId}`);
