import React from 'react';
import MealPlannerItem from './MealPlannerItem';

const MealPlanner = () => {
  return (
    <div className="myMeals">
      <div className="myMeals__container">
        <MealPlannerItem />
      </div>
    </div>
  );
};

export default MealPlanner;
