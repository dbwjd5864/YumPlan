import { combineReducers } from 'redux';
import userReducer from './userReducer';
import mealReducer from './mealReducer';
import errorReducer from './errorReducer';

export default combineReducers({
  users: userReducer,
  meals: mealReducer,
  errors: errorReducer,
});
