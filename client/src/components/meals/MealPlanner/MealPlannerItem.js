import React from 'react';
import { useSelector } from 'react-redux';

import SvgIcon from '../../layout/SvgIcon';

const MealPlannerItem = () => {
  const { mealPlans, loading } = useSelector((state) => state.meals);

  if (mealPlans !== null && mealPlans.length === 0 && !loading) {
    return <h4 className="myMeals__heading heading-2">Please add a Meal ☺</h4>;
  }

  return (
    mealPlans &&
    mealPlans.map((mealPlan) => {
      return (
        <div className="myMeals__item" key={mealPlan._id}>
          <div className="myMeals__item-imgContainer">
            <img
              className="myMeals__item-img"
              src={
                mealPlan.photo.split(':')[0] === 'data'
                  ? mealPlan.photo
                  : require(`../../../img/${mealPlan.photo}`).default
              }
              alt={mealPlan.name}
            />
          </div>
          <div className="myMeals__item-group">
            <h4 className="myMeals__item-name heading-2">{mealPlan.name}</h4>

            <div className="myMeals__item-info">
              <p className="myMeals__info-createdAt">
                {new Date(mealPlan.createdAt).toLocaleDateString([], {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            </div>

            <div className="myMeals__item-ingredients">
              {mealPlan.ingredients.map((ingredient, index) => (
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
            <div className="myMeals__item-tags">
              {mealPlan.tags.length > 0 ? (
                <SvgIcon name="tag" color="#999" width="1.3em" height="1.3em" />
              ) : null}
              <p className="myMeals__tags-container">
                {mealPlan.tags.map((tag, index) => (
                  <span key={index}>#{tag} &nbsp;</span>
                ))}
              </p>
            </div>
          </div>
        </div>
      );
    })
  );
};

export default MealPlannerItem;
