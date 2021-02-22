const initialState = {
  isAuthenticated: null,
  user: {},
  error: null,
  loading: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'USER_LAODING':
      return {
        ...state,
        loading: true,
      };
    case 'USER_LOADED':
    case 'REGISTER_SUCCESS':
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        user: action.payload.user,
        isAuthenticated: true,
        loading: false,
      };
    case 'AUTH_FAIL':
    case 'REGISTER_FAIL':
    case 'LOGIN_FAIL':
    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        user: {},
        loading: false,
      };
    default:
      return state;
  }
};

export default userReducer;
