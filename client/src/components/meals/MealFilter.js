import React, { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { filterMeals, clearFilter } from '../../actions/mealActions';

const MealFilter = () => {
  const { filtered } = useSelector((state) => state.meals);
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
    <form onSubmit={(e) => e.preventDefault()}>
      <input
        ref={search}
        type="text"
        placeholder="Find your daily meal..."
        onChange={filterMeal}
      />
      <button className="search__btn">Enter</button>
    </form>
  );
};

export default MealFilter;
