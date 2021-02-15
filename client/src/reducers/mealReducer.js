const initialState = {
  meals: null,
  mealPlans: null,
  weeklyPlans: null,
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
    case 'FETCH_MEALPLAN_SUCCESS': {
      return {
        ...state,
        mealPlans: action.payload.mealPlans.mealPlan,
        loading: false,
      };
    }
    case 'FETCH_WEEKLYPLAN_SUCCESS': {
      return {
        ...state,
        weeklyPlans: action.payload.weeklyPlan,
        loading: false,
      };
    }
    case 'FETCH_MEALS_FAIL':
    case 'FETCH_MEALPLAN_FAIL':
    case 'FETCH_WEEKLYPLAN_FAIL':
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
    case 'CREATE_MEALPLAN_SUCCESS':
      return {
        ...state,
        loading: false,
        meals: [...state.meals, action.payload.mealPlan],
        mealPlans: [...state.mealPlans, action.payload.mealPlan],
      };
    case 'CREATE_MEALPLAN_FAIL':
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
