import React, { useEffect } from 'react';
import MealWeeklyPlannerForm from './MealWeeklyPlannerForm';
import MealWeeklyPlannerItem from './MealWeeklyPlannerItem';

import { useDispatch, useSelector } from 'react-redux';
import { getWeeklyPlanner } from '../../../actions/mealActions';

const MealWeeklyPlanner = () => {
  const day = ['mon', 'tue', 'wed', 'thur', 'fri', 'sat', 'sun'];

  const { weekly } = useSelector((state) => state.meals);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getWeeklyPlanner(weekly[0]));
  }, []);

  return (
    <div className="planner">
      <div className="planner__week">
        {weekly && weekly[0]} ~ {weekly && weekly[weekly.length - 1]}
      </div>
      <div className="planner__container">
        <MealWeeklyPlannerForm week={weekly} />
        {day.map((day, index) => {
          return (
            <div key={day} className="planner__item">
              <MealWeeklyPlannerItem day={day} index={index} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MealWeeklyPlanner;
