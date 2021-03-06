import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import SvgIcon from '../../layout/SvgIcon';

import { updateFavorite } from '../../../actions/mealActions';
import Loader from '../../layout/Loader';

const MealFavoritesItem = () => {
  const dispatch = useDispatch();
  const { favorites, loading } = useSelector((state) => state.meals);
  const [detail, setDetail] = useState('');

  const updateDetail = (id) => (e) => {
    e.preventDefault();
    if (detail === '') {
      setDetail(id);
    } else {
      setDetail('');
    }
  };

  const changeFavorites = (id) => (e) => {
    dispatch(updateFavorite(id));
    e.stopPropagation();
  };

  if (favorites !== null && favorites.length === 0 && !loading) {
    return (
      <h4 className="favorites__heading heading-2">Please add a Favorite ☺</h4>
    );
  }

  return favorites && !loading ? (
    favorites.map((favorite) => {
      return (
        <div
          className="favorites__item"
          key={favorite._id}
          onClick={updateDetail(favorite._id)}
        >
          <div className="favorites__item-imgContainer">
            <div className="favorites__item-overlay"></div>
            <img
              className="favorites__item-img"
              src={
                favorite.photo.split(':')[0] === 'data'
                  ? favorite.photo
                  : require(`../../../img/${favorite.photo}`).default
              }
              alt={favorite.name}
            />
            <div className="favorites__item-delete">
              <button onClick={changeFavorites(favorite._id)}>
                <SvgIcon
                  name="clear"
                  color="#999"
                  width="2.8em"
                  height="2.8em"
                />
              </button>
            </div>

            <p className="favorites__item-likeCount hovered">
              <SvgIcon name="heart" color="#fff" width="2.1em" height="2.1em" />
              {favorite.likeCount}
            </p>
          </div>

          <div
            className={`favorites__item-modal modal-${
              detail === favorite._id ? 'open' : 'close'
            }`}
          >
            <div className="favorites__modal-group">
              <button
                className="favorites__modal-btn"
                type="button"
                onClick={updateDetail('')}
              >
                <SvgIcon name="clear" color="#fff" width="4em" height="4em" />
              </button>
              <div className="favorites__modal-imgContainer">
                <img
                  className="favorites__modal-img"
                  src={
                    favorite.photo.split(':')[0] === 'data'
                      ? favorite.photo
                      : require(`../../../img/${favorite.photo}`).default
                  }
                  alt={favorite.name}
                />

                <div className="favorites__modal-imgUserContainer">
                  <div className="favorites__modal-imgUser">
                    <p className="favorites__imgUser-name">
                      {favorite.user.name}
                    </p>
                  </div>
                </div>
              </div>
              <div className="favorites__modal-item">
                <h4 className="favorites__modal-name heading-2">
                  {favorite.name}
                </h4>

                <div className="favorites__modal-info">
                  <p className="favorites__modal-createdAt">
                    {new Date(favorite.createdAt).toLocaleDateString([], {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                </div>

                <div className="favorites__modal-ingredients">
                  {favorite.ingredients.map((ingredient, index) => (
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
                <div className="favorites__modal-tags">
                  {favorite.tags.length > 0 ? (
                    <SvgIcon
                      name="tag"
                      color="#999"
                      width="1.3em"
                      height="1.3em"
                    />
                  ) : null}
                  <p className="favorites__modal-container">
                    {favorite.tags.map((tag, index) => (
                      <span key={index}>#{tag} &nbsp;</span>
                    ))}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    })
  ) : (
    <Loader />
  );
};

export default MealFavoritesItem;
