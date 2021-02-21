import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MealFilter from './MealFilter';
import MealItem from './MealItem';
import loader from '../layout/Loader';

import {
  getAllMeals,
  getAllFavorites,
  getMealPlanner,
  setWeekly,
} from '../../actions/mealActions';
import Loader from '../layout/Loader';

const Meal = () => {
  const { meals, filtered } = useSelector((state) => state.meals);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllMeals());
    dispatch(getAllFavorites());
    dispatch(getMealPlanner());
    dispatch(setWeekly(''));
  }, [dispatch]);

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
            }
          })
        ) : filtered ? (
          filtered.map((meal) => {
            if (meal.type === 'Public') {
              return <MealItem key={meal._id} meal={meal} />;
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
