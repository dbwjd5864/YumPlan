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

export const filterMeals = (search) => async (dispatch) => {
  dispatch({ type: 'FILTER_MEALS', payload: search });
};

export const clearFilter = () => async (dispatch) => {
  dispatch({ type: 'CLEAR_FILTER' });
};
