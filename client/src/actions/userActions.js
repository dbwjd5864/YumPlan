import * as api from '../api';
import { returnErrors } from './errorActions';

export const signup = (newUser) => async (dispatch) => {
  try {
    const { data } = await api.signup(newUser);

    console.log(data);

    dispatch({ type: 'REGISTER_SUCCESS', payload: data });
  } catch (err) {
    console.log(err);

    dispatch(
      returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL')
    );
    dispatch({ type: 'REGISTER_FAIL' });
  }
};
