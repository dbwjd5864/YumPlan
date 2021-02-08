import React from 'react';

const MealItem = ({ meal }) => {
  const { name, ingredients, tags, photo, likeCount, user, createdAt } = meal;
  return <div>{name}</div>;
};

export default MealItem;
