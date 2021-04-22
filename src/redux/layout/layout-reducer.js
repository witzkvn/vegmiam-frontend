import { LayoutActionTypes } from './layout-types';

const INITIAL_STATE = {
  theme: localStorage.getItem('theme') || "light",
  errors: null,
};

const layoutReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LayoutActionTypes.SET_THEME:
      if (action.payload !== "light" && action.payload !== "dark") return state;
      return {
        ...state,
        theme: action.payload,
        errors: null
      };
    default:
      return state;
  }
};

export default layoutReducer;