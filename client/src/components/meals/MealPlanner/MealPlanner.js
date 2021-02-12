import React from 'react';
import MealPlannerForm from './MealPlannerForm';

const MealPlanner = () => {
  return (
    <div className="planner">
      <div className="planner__container">
        <MealPlannerForm />
        <div className="planner__item mon"></div>
        <div className="planner__item tue"></div>
        <div className="planner__item wed"></div>
        <div className="planner__item thr"></div>
        <div className="planner__item fri"></div>
        <div className="planner__item sat"></div>
        <div className="planner__item sun"></div>
        <div className="planner__item note"></div>
      </div>
    </div>
  );
};

export default MealPlanner;
