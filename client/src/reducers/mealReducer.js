const initialState = {
  meals: null,
  loading: true,
  filtered: null,
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_MEALS_SUCCESS':
      return {
        ...state,
        meals: action.payload.meals,
        loading: false,
      };
    case 'FETCH_MEALS_FAIL':
      return {
        loading: false,
        error: action.payload,
      };
    case 'FILTER_MEALS':
      return {
        ...state,
        filtered: state.meals.filter((meal) => {
          return meal.name.toLowerCase().includes(action.payload.toLowerCase());
        }),
      };
    case 'CLEAR_FILTER':
      return {
        ...state,
        filtered: null,
      };
    default:
      return state;
  }
};
