import React, { useEffect } from 'react';
import MealWeeklyPlannerForm from './MealWeeklyPlannerForm';
import MealWeeklyPlannerItem from './MealWeeklyPlannerItem';

import { useDispatch, useSelector } from 'react-redux';
import {
  getWeeklyPlanner,
  setWeekly,
  clearWeeklyPlanner,
} from '../../../actions/mealActions';

const MealWeeklyPlanner = () => {
  const day = ['mon', 'tue', 'wed', 'thur', 'fri', 'sat', 'sun'];

  const { weekly, mealPlans } = useSelector((state) => state.meals);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getWeeklyPlanner(weekly[0]));
  }, [weekly, mealPlans]);

  const changeWeek = (status) => (e) => {
    e.preventDefault();
    dispatch(clearWeeklyPlanner());

    if (status === 'prev') {
      let prevWeek = new Date(weekly[0]);
      prevWeek = prevWeek.setDate(prevWeek.getDate() - 2);
      dispatch(setWeekly(prevWeek));
    } else if (status === 'next') {
      let nextWeek = new Date(weekly[weekly.length - 1]);
      nextWeek = nextWeek.setDate(nextWeek.getDate() + 1);
      dispatch(setWeekly(nextWeek));
    }
  };

  return (
    <div className="planner">
      <div className="planner__week">
        <button className="planner__week-btn" onClick={changeWeek('prev')}>
          <span>&larr;</span>Prev
        </button>
        <h2 className="planner__week-heading">
          {weekly && weekly[0]} ~ {weekly && weekly[weekly.length - 1]}
        </h2>
        <button className="planner__week-btn" onClick={changeWeek('next')}>
          Next<span>&rarr;</span>
        </button>
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
