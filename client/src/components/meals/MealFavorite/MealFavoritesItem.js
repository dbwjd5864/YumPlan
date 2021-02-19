import React from 'react';
import { useSelector } from 'react-redux';

import defaultImg from '../../../img/spoon.png';
import SvgIcon from '../../layout/SvgIcon';

const MealFavoritesItem = () => {
  const { favorites } = useSelector((state) => state.meals);

  return (
    favorites &&
    favorites.map((favorite) => {
      return (
        <div className="favorites__item" key={favorite._id}>
          <div className="favorites__item-imgContainer">
            <div className="favorites__item-overlay"></div>
            <img
              className="favorites__item-img"
              src={favorite.photo === 'spoon.png' ? defaultImg : favorite.photo}
              alt={favorite.name}
            />

            <p className="favorites__item-likeCount hovered">
              <SvgIcon
                name="heart"
                color="#eb9f9f"
                width="2.1rem"
                height="2.1rem"
              />
              {favorite.likeCount}
            </p>
          </div>
          <div className="myMeals__item-group">
            <h4 className="myMeals__item-name heading-2">{favorite.name}</h4>

            <div className="myMeals__item-info">
              <p className="myMeals__info-createdAt">
                {new Date(favorite.createdAt).toLocaleDateString([], {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            </div>

            <div className="myMeals__item-ingredients">
              {favorite.ingredients.map((ingredient, index) => (
                <span key={index}>
                  <SvgIcon
                    name="triangle-right"
                    color="#999"
                    width="1.3rem"
                    height="1.3rem"
                  />{' '}
                  {ingredient}
                </span>
              ))}
            </div>
            <div className="myMeals__item-tags">
              {favorite.tags.length > 0 ? (
                <SvgIcon
                  name="tag"
                  color="#999"
                  width="1.3rem"
                  height="1.3rem"
                />
              ) : null}
              <p className="myMeals__tags-container">
                {favorite.tags.map((tag, index) => (
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

export default MealFavoritesItem;
