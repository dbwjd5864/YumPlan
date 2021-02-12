import React, { useState } from 'react';
import FileBase from 'react-file-base64';
import { useDispatch } from 'react-redux';
import { createMealPlan } from '../../../actions/mealActions';
import SvgIcon from '../../layout/SvgIcon';

const MealPlannerForm = () => {
  const dispatch = useDispatch();

  const [mealPlan, setMealPlan] = useState({
    name: '',
    photo: '',
    type: '',
    tags: [],
    ingredients: [],
  });

  const [ingredient, setIngredient] = useState('');
  const [tag, setTag] = useState('');
  const { name, photo, type, tags, ingredients } = mealPlan;

  const changeForMealPlan = (e) => {
    setMealPlan({
      ...mealPlan,
      [e.target.name]: e.target.value,
    });
  };

  const addInput = (type) => (e) => {
    e.preventDefault();

    if (type === 'ingredients') {
      setMealPlan({
        ...mealPlan,
        ['ingredients']: [...ingredients, ingredient],
      });
    } else if (type === 'tags') {
      setMealPlan({
        ...mealPlan,
        ['tags']: [...tags, tag],
      });
    }

    setIngredient('');
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
        photo,
      })
    );
  };

  return (
    <div className="planner__form">
      <h2>Add Meal Plan</h2>

      <form onSubmit={submitMealPlan}>
        <div className="planner__form-group">
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

        <div className="planner__form-group">
          <input
            className="planner__form-input"
            type="text"
            name="name"
            value={name}
            onChange={changeForMealPlan}
            placeholder="Meal Name"
          ></input>
        </div>

        <div className="planner__form-group">
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
            onClick={addInput('ingredients')}
          >
            <SvgIcon
              name="plus-alt"
              color="#999"
              width="1.3rem"
              height="1.3rem"
            />
          </button>
          <p className="planner__form-array ingredients">
            {ingredients.map((ingredient, index) => {
              return <span key={index}>{ingredient} </span>;
            })}
          </p>
        </div>

        <div className="planner__form-group">
          <input
            className="planner__form-input"
            type="text"
            name="tag"
            value={tag}
            onChange={(e) => setTag(e.target.value)}
            placeholder="Tags"
          ></input>
          <button className="planner__form-inputAdd" onClick={addInput('tags')}>
            <SvgIcon
              name="plus-alt"
              color="#999"
              width="1.3rem"
              height="1.3rem"
            />
          </button>
          <p className="planner__form-array tags">
            {tags.map((tag, index) => {
              return <span key={index}>#{tag} </span>;
            })}
          </p>
        </div>

        <div className="planner__form-group">
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) => setMealPlan({ ...mealPlan, photo: base64 })}
          />
        </div>

        <input type="submit" value="Register" className="signup__button" />
      </form>
    </div>
  );
};

export default MealPlannerForm;
