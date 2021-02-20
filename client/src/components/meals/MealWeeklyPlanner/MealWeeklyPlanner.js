import React, { useEffect } from 'react';
import MealWeeklyPlannerForm from './MealWeeklyPlannerForm';
import MealWeeklyPlannerItem from './MealWeeklyPlannerItem';

import { useDispatch, useSelector } from 'react-redux';
import { getWeeklyPlanner, setWeekly } from '../../../actions/mealActions';

const MealWeeklyPlanner = () => {
  const day = ['mon', 'tue', 'wed', 'thur', 'fri', 'sat', 'sun'];

  const { weekly } = useSelector((state) => state.meals);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getWeeklyPlanner(weekly[0]));
  }, []);

  const changeWeek = (status) => async (e) => {
    e.preventDefault();
    let prevWeek = new Date(weekly[0]);
    let nextWeek = new Date(weekly[weekly.length - 1]);

    if (status === 'prev') {
      await dispatch(setWeekly(prevWeek.getDate()));
      dispatch(getWeeklyPlanner(weekly[0]));
    } else if (status === 'next') {
      await dispatch(setWeekly(+nextWeek.getDate() + 2));
      dispatch(getWeeklyPlanner(weekly[0]));
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
