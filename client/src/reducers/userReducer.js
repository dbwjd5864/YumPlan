const initialState = {
  isAuthenticated: null,
  user: null,
  error: null,
  loading: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'USER_LAODING':
      return {
        ...state,
        loading: true,
      };
    case 'USER_LOADED': {
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.payload,
      };
    }
    case 'REGISTER_SUCCESS':
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        loading: false,
      };
    case 'AUTH_ERROR':
    case 'REGISTER_FAIL':
    case 'LOGIN_FAIL':
    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        loading: false,
      };
    default:
      return state;
  }
};
