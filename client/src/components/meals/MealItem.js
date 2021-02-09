import React from 'react';
import defaultImg from '../../img/spoon.png';

const MealItem = ({ meal }) => {
  const { name, ingredients, tags, photo, likeCount, user, createdAt } = meal;

  return (
    <div className="meal__item">
      <button className="meal__item--like">* {likeCount}</button>
      <div className="meal__item--name">{name}</div>
      <img
        className="meal__item--img"
        src={photo === 'spoon.png' ? defaultImg : photo}
        alt={name}
      />
      <div className="meal__item--useInfo">
        <p className="meal__userInfo--user">{user.name}</p>
        <p className="meal__userInfo--createdAt">
          {new Date(createdAt).toLocaleDateString([], {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </p>
      </div>
      <div className="meal__item--ingredients">
        Ingredients:{' '}
        {ingredients.map((ingredient, index) => (
          <span key={index}>{ingredient} </span>
        ))}
      </div>
      <div className="meal__item--tags">
        {tags.map((tag, index) => (
          <span key={index}>#{tag} </span>
        ))}
      </div>
    </div>
  );
};

export default MealItem;
