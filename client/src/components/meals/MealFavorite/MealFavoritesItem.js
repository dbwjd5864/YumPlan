import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import defaultImg from '../../../img/spoon.png';
import SvgIcon from '../../layout/SvgIcon';

const MealFavoritesItem = () => {
  const { favorites } = useSelector((state) => state.meals);
  const [detail, setDetail] = useState('');

  const updateDetail = (id) => (e) => {
    e.preventDefault();
    if (detail === '') {
      setDetail(id);
    } else {
      setDetail('');
    }
  };

  return (
    favorites &&
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
              src={favorite.photo === 'spoon.png' ? defaultImg : favorite.photo}
              alt={favorite.name}
            />

            <p className="favorites__item-likeCount hovered">
              <SvgIcon
                name="heart"
                color="#fff"
                width="2.1rem"
                height="2.1rem"
              />
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
                <SvgIcon name="clear" color="#fff" width="4rem" height="4rem" />
              </button>
              <div className="favorites__modal-imgContainer">
                <img
                  className="favorites__modal-img"
                  src={
                    favorite.photo === 'spoon.png' ? defaultImg : favorite.photo
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
                        width="1.3rem"
                        height="1.3rem"
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
                      width="1.3rem"
                      height="1.3rem"
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
  );
};

export default MealFavoritesItem;
