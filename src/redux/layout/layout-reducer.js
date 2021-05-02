import { LayoutActionTypes } from './layout-types';

const INITIAL_STATE = {
  theme: localStorage.getItem('theme') || "light",
  errors: null,
  popup: {
    active: false,
    status: null,
    message: ""
  },
  overlayMessageOpen: false
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

    case LayoutActionTypes.OPEN_POPUP_MESSAGE:
      return {
        ...state,
        popup: {
          active: true,
          status: action.payload.status,
          message: action.payload.message
        }
      }
    case LayoutActionTypes.CLOSE_POPUP_MESSAGE:
      return {
        ...state,
        popup: {
          active: false,
          status: null,
          message: ""
        }
      }
    case LayoutActionTypes.OPEN_OVERLAY_MESSAGE:
      return {
        ...state,
        overlayMessageOpen: true
      }
    case LayoutActionTypes.CLOSE_OVERLAY_MESSAGE:
      return {
        ...state,
        overlayMessageOpen: false
      }
    default:
      return state;
  }
};

export default layoutReducer;