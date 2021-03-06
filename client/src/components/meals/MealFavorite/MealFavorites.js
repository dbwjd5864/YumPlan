import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import MealFavoritesItem from './MealFavoritesItem';

import { getAllFavorites } from '../../../actions/mealActions';

const MealFavorites = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllFavorites());
  }, [dispatch]);

  return (
    <div className="favorites">
      <div className="favorites__container">
        <MealFavoritesItem />
      </div>
    </div>
  );
};

export default MealFavorites;
