import React, { useEffect, useState } from 'react';
import MealPlannerForm from './MealPlannerForm';
import MealPlannerItem from './MealPlannerItem';

import { useDispatch, useSelector } from 'react-redux';
import { getMealPlanner } from '../../../actions/mealActions';

const MealPlanner = () => {
  const { mealPlans } = useSelector((state) => state.meals);

  const day = ['mon', 'tue', 'wed', 'thur', 'fri', 'sat', 'sun'];

  const [week, setWeek] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMealPlanner());
    setWeekly();
  }, []);

  const setWeekly = () => {
    let today = new Date();
    let weekly = [];

    for (let i = 1; i <= 7; i++) {
      let firstDate = today.getDate() - today.getDay() + i;

      let date = new Date(today.setDate(firstDate))
        .toISOString()
        .slice(0, 10)
        .toString();

      weekly.push(date);
    }
    setWeek(weekly);
  };

  return (
    <div className="planner">
      <div className="planner__week">
        {week[0]} ~ {week[week.length - 1]}
      </div>
      <div className="planner__container">
        <MealPlannerForm week={week} />
        {day.map((day, index) => {
          return (
            <div key={day} className="planner__item">
              <MealPlannerItem day={day} index={index} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MealPlanner;
