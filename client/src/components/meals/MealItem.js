import React from 'react';
import defaultImg from '../../img/spoon.png';
import SvgIcon from '../layout/SvgIcon';

const MealItem = ({ meal }) => {
  const { name, ingredients, tags, photo, likeCount, user, createdAt } = meal;

  return (
    <div className="meal__item">
      <div className="meal__item-like">
        <button className="meal__item-likeBtn">
          <SvgIcon
            name="heart"
            color="#eb9f9f"
            width="2.1rem"
            height="2.1rem"
          />{' '}
        </button>
        <p className="meal__item-likeCount">{likeCount}</p>
      </div>
      <div className="meal__item-name heading-2">{name}</div>
      <img
        className="meal__item-img"
        src={photo === 'spoon.png' ? defaultImg : photo}
        alt={name}
      />
      <div className="meal__item-userInfo">
        <p className="meal__userInfo-user">{user.name}</p>
        <p className="meal__userInfo-createdAt">
          {new Date(createdAt).toLocaleDateString([], {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </p>
      </div>
      <div className="meal__item-ingredients">
        Ingredients:{' '}
        {ingredients.map((ingredient, index) => (
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
      <div className="meal__item-tags">
        {tags.length > 0 ? (
          <SvgIcon name="tag" color="#999" width="1.3rem" height="1.3rem" />
        ) : null}
        <p className="meal__tags-container">
          {tags.map((tag, index) => (
            <span key={index}>#{tag} &nbsp;</span>
          ))}
        </p>
      </div>
    </div>
  );
};

export default MealItem;
