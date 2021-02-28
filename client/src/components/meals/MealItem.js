import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateLikeCount, addFavorite } from '../../actions/mealActions';
import SvgIcon from '../layout/SvgIcon';

const MealItem = ({ meal }) => {
  const [likeStatus, setLikeStatus] = useState();
  const dispatch = useDispatch();
  const {
    name,
    ingredients,
    tags,
    photo,
    likeCount,
    user,
    createdAt,
    _id,
  } = meal;

  useEffect(() => {
    if (likeStatus) {
      dispatch(updateLikeCount(_id, likeStatus));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [likeStatus, dispatch]);

  const changeLikeBtn = (e) => {
    e.preventDefault();

    if (likeStatus === undefined || likeStatus === 'unlike') {
      setLikeStatus('like');
    } else {
      setLikeStatus('unlike');
    }
  };

  return (
    <div className="meal__item">
      <div className="meal__item-like">
        <button className="meal__item-likeBtn" onClick={changeLikeBtn}>
          {likeStatus === undefined || likeStatus === 'unlike' ? (
            <SvgIcon
              name="heart-outlined"
              color="#eb9f9f"
              width="2.1rem"
              height="2.1rem"
            />
          ) : (
            <SvgIcon
              name="heart"
              color="#eb9f9f"
              width="2.1rem"
              height="2.1rem"
            />
          )}
        </button>
        <p className="meal__item-likeCount">{likeCount}</p>
      </div>
      <h4 className="meal__item-name heading-2">{name}</h4>
      <div className="meal__item-imgContainer">
        <img
          className="meal__item-img meal__item-imgDefault"
          src={
            photo.split(':')[0] === 'data'
              ? photo
              : require(`../../img/${photo}`).default
          }
          alt={name}
        />
        <button
          className="meal__item-addBtn"
          onClick={() => {
            dispatch(addFavorite(_id));
          }}
        >
          <SvgIcon
            name="squared-plus"
            color="#fff"
            width="2.2rem"
            height="2.2rem"
          />
        </button>
      </div>
      <div className="meal__item-userInfo">
        <p className="meal__userInfo-user">{user.name}</p>
        <p className="meal__userInfo-createdAt">{createdAt.split('T')[0]}</p>
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
