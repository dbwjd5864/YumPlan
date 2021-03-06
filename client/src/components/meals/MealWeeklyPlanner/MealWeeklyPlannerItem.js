import React from 'react';
import SvgIcon from '../../layout/SvgIcon';

import { useDispatch, useSelector } from 'react-redux';
import {
  clearCurrentMealPlan,
  deleteMealPlan,
  setCurrentMealPlan,
} from '../../../actions/mealActions';
import Loader from '../../layout/Loader';

const MealWeeklyPlannerItem = ({ day, index }) => {
  const { weeklyPlans } = useSelector((state) => state.meals);
  const dispatch = useDispatch();

  return (
    <fieldset className={`planner__item-border ${day}`}>
      <legend className="planner__item-heading heading-2">
        {day.toUpperCase()}
      </legend>

      {weeklyPlans ? (
        weeklyPlans.map((plan) => {
          if (new Date(plan.createdAt).getDay() === index) {
            return (
              <div key={plan.name + index} className="planner__item-group">
                <button
                  className="planner__item-minusBtn"
                  onClick={() => {
                    dispatch(deleteMealPlan(plan._id));
                    clearCurrentMealPlan();
                  }}
                >
                  <SvgIcon
                    name="minus-circle"
                    color="#8d8479"
                    width="2.2em"
                    height="2.2em"
                  />
                </button>

                <div className="planner__item-imgContainer">
                  <img
                    className="planner__item-img"
                    src={
                      plan.photo.split(':')[0] === 'data'
                        ? plan.photo
                        : require(`../../../img/${plan.photo}`).default
                    }
                    alt={plan.name}
                  />
                  <button
                    className="planner__item-updateBtn"
                    onClick={() => dispatch(setCurrentMealPlan(plan))}
                  >
                    <SvgIcon
                      name="more-horizontal"
                      color="#fff"
                      width="2.4em"
                      height="2.4em"
                    />
                  </button>
                </div>

                <h2 className="planner__item-name heading2">{plan.name}</h2>

                <p className="planner__item-createdAt">
                  {plan.createdAt.split('T')[0]}
                </p>

                <div className="planner__item-ingredients">
                  Ingredients:{' '}
                  {plan.ingredients.map((ingredient, index) => (
                    <span key={index}>
                      <SvgIcon
                        name="triangle-right"
                        color="#999"
                        width="1.3em"
                        height="1.3em"
                      />{' '}
                      {ingredient}
                    </span>
                  ))}
                </div>

                <div className="planner__item-tags">
                  {plan.tags.length > 0 ? (
                    <SvgIcon
                      name="tag"
                      color="#999"
                      width="1.3em"
                      height="1.3em"
                    />
                  ) : null}
                  <p className="planner__tags-container">
                    {plan.tags.map((tag, index) => (
                      <span key={index}>#{tag} &nbsp;</span>
                    ))}
                  </p>
                </div>
              </div>
            );
          } else {
            return null;
          }
        })
      ) : (
        <Loader />
      )}
    </fieldset>
  );
};

export default MealWeeklyPlannerItem;
