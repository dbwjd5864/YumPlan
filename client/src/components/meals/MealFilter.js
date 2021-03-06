import React, { useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { filterMeals, clearFilter } from '../../actions/mealActions';
import SvgIcon from '../layout/SvgIcon';

const MealFilter = ({ filtered }) => {
  const search = useRef('');
  const dispatch = useDispatch();

  useEffect(() => {
    if (filtered === null) {
      search.current.value = '';
    }
  }, [filtered]);

  const filterMeal = (e) => {
    if (search.current.value !== '') {
      dispatch(filterMeals(e.target.value));
    } else {
      dispatch(clearFilter());
    }
  };

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="meal__search-container"
    >
      <input
        className="meal__search-input"
        ref={search}
        type="text"
        placeholder="Find your daily meal..."
        onChange={filterMeal}
      />
      <button className="meal__search-btn">
        <SvgIcon name="search" color="#fff" width="1.8em" height="1.5em" />
      </button>
    </form>
  );
};

export default MealFilter;
