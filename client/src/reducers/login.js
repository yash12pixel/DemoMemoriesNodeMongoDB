import isEmpty from "../utils/isEmpty";
import {
  LOGIN_USER,
  SET_CURRENT_USER,
  REMOVE_CURRENT_USER,
} from "../constants/actionTypes";

const initialState = {
  isAuthenticated: false,
  user: {},
  token: "",
  isLogin: false,
  isWarning: false, //error
  message: "",
  loading: false,
  disable: false,
};

export const setCurrentUser = (decodedUser) => {
  if (isEmpty(decodedUser)) {
    return {
      type: SET_CURRENT_USER,
      payload: decodedUser,
    };
  }
  //LOGIN Case
  if (!isEmpty(decodedUser)) {
    return {
      type: SET_CURRENT_USER,
      payload: decodedUser,
    };
  }
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(state.user),
      };
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload,
        token: localStorage.getItem("token"),
      };
    case REMOVE_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: false,
        user: {},
        token: localStorage.removeItem("token"),
      };
    default:
      return state;
  }
};

export default loginReducer;
