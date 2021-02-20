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

export const getAllFavorites = () => async (dispatch) => {
  try {
    const { data } = await api.getAllFavorites();

    dispatch({ type: 'FETCH_FAVORITES_SUCCESS', payload: data });
  } catch (err) {
    dispatch({
      type: 'FETCH_FAVORITES_FAIL',
      payload: err.message,
    });
  }
};

export const addFavorite = (mealId) => async (dispatch) => {
  try {
    const { data } = await api.addFavorite(mealId);

    dispatch({ type: 'ADD_FAVORITE_SUCCESS', payload: data });
  } catch (err) {
    dispatch({
      type: 'ADD_FAVORITE_FAIL',
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

export const clearWeeklyPlanner = () => async (dispatch) => {
  dispatch({
    type: 'CLEAR_WEEKLY_PLANNER',
  });
};

export const setWeekly = (setDate) => async (dispatch) => {
  let today;
  let weekly = [];

  if (setDate === '') {
    today = new Date();

    for (let i = 1; i <= 7; i++) {
      let firstDate = today.getDate() - today.getDay() + i;

      let date = new Date(today.setDate(firstDate));
      date = (
        date.getFullYear() +
        '-' +
        ((date.getMonth() + 1 + '').length === 1
          ? '0' + (date.getMonth() + 1)
          : date.getMonth() + 1) +
        '-' +
        date.getDate()
      ).toString();

      weekly.push(date);
    }
  } else {
    today = new Date(setDate);

    for (let i = 1; i <= 7; i++) {
      let firstDate = today.getDate() - today.getDay() + i;

      let date = new Date(today.setDate(firstDate));
      date = (
        date.getFullYear() +
        '-' +
        ((date.getMonth() + 1 + '').length === 1
          ? '0' + (date.getMonth() + 1)
          : date.getMonth() + 1) +
        '-' +
        ((date.getDate() + '').length === 1
          ? '0' + date.getDate()
          : date.getDate())
      ).toString();

      weekly.push(date);
    }
  }

  dispatch({ type: 'SET_WEEKLY_SUCCESS', payload: weekly });
};
