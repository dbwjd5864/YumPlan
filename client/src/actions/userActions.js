import * as api from '../api';
import { returnErrors } from './errorActions';

export const isLoggedIn = () => async (dispatch) => {
  try {
    const { data } = await api.isLoggedIn();

    dispatch({ type: 'USER_LOADED', payload: data });
  } catch (err) {
    console.log(err);

    dispatch({ type: 'AUTH_FAIL' });
  }
};

export const signup = (newUser) => async (dispatch) => {
  try {
    const { data } = await api.signup(newUser);

    dispatch({ type: 'REGISTER_SUCCESS', payload: data });
  } catch (err) {
    console.log(err);

    dispatch(
      returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL')
    );
    dispatch({ type: 'REGISTER_FAIL' });
  }
};

export const login = (user) => async (dispatch) => {
  try {
    const { data } = await api.login(user);

    dispatch({ type: 'LOGIN_SUCCESS', payload: data });
  } catch (err) {
    console.log(err);

    dispatch(
      returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL')
    );
    dispatch({ type: 'LOGIN_FAIL' });
  }
};

export const logout = () => async (dispatch) => {
  try {
    await api.logout();

    dispatch({ type: 'LOGOUT' });
  } catch (err) {
    console.log(err);
  }
};
