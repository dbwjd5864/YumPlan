import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MealFilter from './MealFilter';
import MealItem from './MealItem';

import { getAllMeals } from '../../actions/mealActions';

const Meal = () => {
  const { meals } = useSelector((state) => state.meals);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllMeals());
  }, []);

  return (
    <div className="meal">
      <div className="meal__search">
        <MealFilter />
      </div>
      <div className="meal__container">
        {meals
          ? meals.map((meal) => {
              if (meal.type === 'public') {
                return <MealItem key={meal._id} meal={meal} />;
              }
            })
          : null}
      </div>
    </div>
  );
};

export default Meal;
