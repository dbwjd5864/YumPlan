const initialState = {
  meals: null,
  mealPlans: null,
  weeklyPlans: null,
  currentMealPlan: null,
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
    case 'UPDATE_MEALPLAN_SUCCESS': {
      return {
        ...state,
        meals: state.meals.map((meal) =>
          meal._id === action.payload.mealPlan_id
            ? action.payload.mealPlan
            : meal
        ),
        mealPlans: state.mealPlans.map((mealPlan) =>
          mealPlan._id === action.payload.mealPlan_id
            ? action.payload.mealPlan
            : mealPlan
        ),
        weeklyPlans: state.weeklyPlans.map((mealPlan) =>
          mealPlan._id === action.payload.mealPlan_id
            ? action.payload.mealPlan
            : mealPlan
        ),
        loading: false,
      };
    }
    case 'DELETE_MEALPLAN_SUCCESS': {
      return {
        ...state,
        meals: state.meals.filter((meal) => meal._id !== action.payload),
        mealPlans: state.mealPlans.filter(
          (mealPlan) => mealPlan._id !== action.payload
        ),
        weeklyPlans: state.weeklyPlans.filter(
          (mealPlan) => mealPlan._id !== action.payload
        ),
        loading: false,
      };
    }
    case 'SET_CURRENT_MEALPLAN': {
      return {
        ...state,
        currentMealPlan: action.payload,
      };
    }
    case 'CLEAR_CURRENT_MEALPLAN': {
      return {
        ...state,
        currentMealPlan: null,
      };
    }
    default:
      return state;
  }
};
