import React, { useState } from 'react';
import FileBase from 'react-file-base64';
import { useDispatch } from 'react-redux';
import {
  createMealPlan,
  getWeeklyPlanner,
  getMealPlanner,
} from '../../../actions/mealActions';
import SvgIcon from '../../layout/SvgIcon';

const MealPlannerForm = ({ week }) => {
  const dispatch = useDispatch();

  const [mealPlan, setMealPlan] = useState({
    name: '',
    photo: '',
    type: '',
    tags: [],
    ingredients: [],
    createdAt: '',
  });

  const [ingredient, setIngredient] = useState('');
  const [tag, setTag] = useState('');
  const { name, photo, type, tags, ingredients, createdAt } = mealPlan;

  const changeForMealPlan = (e) => {
    setMealPlan({
      ...mealPlan,
      [e.target.name]: e.target.value,
    });
  };

  const addIngredient = (e) => {
    e.preventDefault();

    if (ingredient) {
      setMealPlan({
        ...mealPlan,
        ['ingredients']: [...ingredients, ingredient],
      });
    }

    setIngredient('');
  };

  const addTag = (e) => {
    e.preventDefault();

    if (tag) {
      setMealPlan({
        ...mealPlan,
        ['tags']: [...tags, tag],
      });
    }

    setTag('');
  };

  const submitMealPlan = (e) => {
    e.preventDefault();

    dispatch(
      createMealPlan({
        name,
        type,
        tags,
        ingredients,
        createdAt,
        photo,
      })
    );

    setMealPlan({
      name: '',
      photo: '',
      type: '',
      tags: [],
      ingredients: [],
      createdAt: '',
    });

    dispatch(getWeeklyPlanner(week[0]));
    dispatch(getMealPlanner());
  };

  return (
    <div className="planner__form">
      <fieldset className="planner__form-border">
        <legend className="planner__form-heading heading-2">
          Add Meal Plan
        </legend>

        <form className="planner__form-container" onSubmit={submitMealPlan}>
          <div className="planner__form-groupRadio">
            <input
              className="planner__form-radio"
              checked={type === 'Public'}
              type="radio"
              name="type"
              value="Public"
              onChange={changeForMealPlan}
            />
            <label className="planner__form-radioLabel">Public </label>

            <input
              className="planner__form-radio"
              checked={type === 'Private'}
              type="radio"
              name="type"
              value="Private"
              onChange={changeForMealPlan}
            />
            <label className="planner__form-radioLabel">Private </label>
          </div>

          <div className="planner__form-groupDate">
            <label className="planner__form-selectLabel" htmlFor="date">
              Choose a date:
            </label>

            <select
              id="date"
              name="createdAt"
              value={createdAt}
              onChange={changeForMealPlan}
            >
              <option value="select">Select...</option>
              {week &&
                week.map((date) => {
                  return (
                    <option key={date} value={date}>
                      {date}
                    </option>
                  );
                })}
            </select>
          </div>

          <div className="planner__form-groupInput">
            <div className="planner__form-group">
              <input
                className="planner__form-input planner__form-inputName"
                type="text"
                name="name"
                value={name}
                onChange={changeForMealPlan}
                placeholder="Meal Name"
              ></input>
            </div>

            <div className="planner__form-group">
              <div className="planner__input-container">
                <input
                  className="planner__form-input"
                  type="text"
                  name="ingredient"
                  value={ingredient}
                  onChange={(e) => setIngredient(e.target.value)}
                  placeholder="Ingredients"
                ></input>
                <button
                  className="planner__form-inputAdd"
                  onClick={addIngredient}
                >
                  <SvgIcon
                    name="plus-alt"
                    color="#999"
                    width="1.6rem"
                    height="1.6rem"
                  />
                </button>
              </div>
              <p className="planner__form-array ingredients">
                {ingredients.map((ingredient, index) => {
                  return <span key={index}>{ingredient} </span>;
                })}
              </p>
            </div>

            <div className="planner__form-group">
              <div className="planner__input-container">
                <input
                  className="planner__form-input"
                  type="text"
                  name="tag"
                  value={tag}
                  onChange={(e) => setTag(e.target.value)}
                  placeholder="Tags"
                ></input>
                <button className="planner__form-inputAdd" onClick={addTag}>
                  <SvgIcon
                    name="plus-alt"
                    color="#999"
                    width="1.6rem"
                    height="1.6rem"
                  />
                </button>
              </div>
              <p className="planner__form-array tags">
                {tags.map((tag, index) => {
                  return <span key={index}>#{tag}</span>;
                })}
              </p>
            </div>
          </div>

          <div className="planner__form-group">
            <FileBase
              id="file-upload"
              type="file"
              multiple={false}
              onDone={({ base64 }) =>
                setMealPlan({ ...mealPlan, photo: base64 })
              }
            />
          </div>

          <input
            type="submit"
            value="Add Your Meal Plan"
            className="form__button"
          />
        </form>
      </fieldset>
    </div>
  );
};

export default MealPlannerForm;
