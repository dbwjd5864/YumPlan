import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MealFilter from './MealFilter';
import MealItem from './MealItem';
import Loader from '../layout/Loader';

import {
  getAllMeals,
  getMealPlanner,
  getAllFavorites,
  setWeekly,
} from '../../actions/mealActions';

import { clearErrors } from '../../actions/errorActions';

const Meal = () => {
  const error = useSelector((state) => state.errors);
  const { meals, filtered } = useSelector((state) => state.meals);
  const { isAuthenticated } = useSelector((state) => state.users);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllMeals());
    dispatch(setWeekly(''));
  }, [dispatch]);

  useEffect(() => {
    dispatch(getMealPlanner());
    dispatch(getAllFavorites());
  }, [dispatch, isAuthenticated]);

  useEffect(() => {
    if (error.id === 'ADD_FAVORITE_FAIL') {
      alert(error.msg.msg);
      dispatch(clearErrors());
    }
  }, [error, dispatch]);

  return (
    <div className="meal">
      <div className="meal__search">
        <MealFilter filtered />
      </div>
      <div className="meal__container">
        {meals && !filtered ? (
          meals.map((meal) => {
            if (meal.type === 'Public') {
              return <MealItem key={meal._id} meal={meal} />;
            } else {
              return null;
            }
          })
        ) : filtered ? (
          filtered.map((meal) => {
            if (meal.type === 'Public') {
              return <MealItem key={meal._id} meal={meal} />;
            } else {
              return null;
            }
          })
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
};

export default Meal;
