import * as api from '../api/index';

export const getAllMeals = () => async (dispatch) => {
  try {
    const { data } = await api.getAllMeals();

    dispatch({ type: 'FETCH_MEALS_SUCCESS', payload: data });
  } catch (err) {
    dispatch({
      type: 'FETCH_MEALS_FAIL',
      payload: err.message,
    });
  }
};

export const updateLikeCount = (mealId, likeStatus) => async (dispatch) => {
  try {
    const { data } = await api.updateLikeCount(mealId, likeStatus);

    dispatch({
      type: 'UPDATE_LIKECOUNT_SUCCESS',
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: 'UPDATE_LIKECOUNT_FAIL',
      payload: err.message,
    });
  }
};

export const getMealPlanner = () => async (dispatch) => {
  try {
    const { data } = await api.getMealPlanner();

    dispatch({ type: 'FETCH_MEALPLAN_SUCCESS', payload: data });
  } catch (err) {
    dispatch({ type: 'FETCH_MEALPLAN_FAIL', payload: err.message });
  }
};

export const getWeeklyPlanner = (week) => async (dispatch) => {
  try {
    const { data } = await api.getWeeklyPlanner(week);

    dispatch({ type: 'FETCH_WEEKLYPLAN_SUCCESS', payload: data });
  } catch (err) {
    dispatch({ type: 'FETCH_WEEKLYPLAN_FAIL', payload: err.message });
  }
};

export const createMealPlan = (mealPlan) => async (dispatch) => {
  try {
    const { data } = await api.createMealPlan(mealPlan);

    dispatch({ type: 'CREATE_MEALPLAN_SUCCESS', payload: data });
  } catch (err) {
    dispatch({
      type: 'CREATE_MEALPLAN_FAIL',
      payload: err.message,
    });
  }
};

export const filterMeals = (search) => async (dispatch) => {
  dispatch({ type: 'FILTER_MEALS', payload: search });
};

export const clearFilter = () => async (dispatch) => {
  dispatch({ type: 'CLEAR_FILTER' });
};

export const updateMealPlan = (mealId, mealPlan) => async (dispatch) => {
  try {
    const { data } = await api.updateMealPlan(mealId, mealPlan);

    dispatch({ type: 'UPDATE_MEALPLAN_SUCCESS', payload: data });
  } catch (err) {
    dispatch({
      type: 'UPDATE_MEALPLAN_FAIL',
      payload: err.message,
    });
  }
};

export const deleteMealPlan = (mealId) => async (dispatch) => {
  try {
    await api.deleteMealPlan(mealId);

    dispatch({ type: 'DELETE_MEALPLAN_SUCCESS', payload: mealId });
  } catch (err) {
    dispatch({
      type: 'DELETE_MEALPLAN_FAIL',
      payload: err.message,
    });
  }
};

export const setCurrentMealPlan = (mealPlan) => async (dispatch) => {
  dispatch({
    type: 'SET_CURRENT_MEALPLAN',
    payload: mealPlan,
  });
};

export const clearCurrentMealPlan = () => async (dispatch) => {
  dispatch({
    type: 'CLEAR_CURRENT_MEALPLAN',
  });
};
