import React from 'react';
import MealFavoritesItem from './MealFavoritesItem';

const MealFavorites = () => {
  return (
    <div className="favorites">
      <div className="favorites__container">
        <MealFavoritesItem />
      </div>
    </div>
  );
};

export default MealFavorites;
