import React from 'react';

const MealPlannerItem = ({ day, index }) => {
  const mealPlanLayout = (i) => {
    // const mealPlans;
  };

  return (
    <fieldset className={`planner__item-border ${day}`}>
      <legend className="planner__item-heading heading-2">
        {day.toUpperCase()}
      </legend>
    </fieldset>
  );
};

export default MealPlannerItem;
