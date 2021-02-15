import React, { useEffect, useState } from 'react';
import MealPlannerForm from './MealPlannerForm';
import MealPlannerItem from './MealPlannerItem';

import { useDispatch, useSelector } from 'react-redux';
import { getMealPlanner, getWeeklyPlanner } from '../../../actions/mealActions';

const MealPlanner = () => {
  const day = ['mon', 'tue', 'wed', 'thur', 'fri', 'sat', 'sun'];

  const [week, setWeek] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMealPlanner());
    setWeekly();
  }, []);

  useEffect(() => {
    dispatch(getWeeklyPlanner(week[0]));
  }, [week]);

  const setWeekly = () => {
    let today = new Date();
    let weekly = [];

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
    setWeek(weekly);
  };

  return (
    <div className="planner">
      <div className="planner__week">
        {week[0]} ~ {week[week.length - 1]}
      </div>
      <div className="planner__container">
        <MealPlannerForm week={week} />
        {day.map((day) => {
          return (
            <div key={day} className="planner__item">
              <MealPlannerItem day={day} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MealPlanner;
