import { UserActionTypes } from './user-types'

let currentUser = JSON.parse(localStorage.getItem('user'));

const INITIAL_STATE = {
  // currentUser: currentUser ? currentUser.user : null,
  currentUser: currentUser || null,
  clickedUser: null,
  errors: null,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UserActionTypes.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload,
        errors: null
      };
    case UserActionTypes.SET_CLICKED_USER:
      return {
        ...state,
        clickedUser: action.payload || null,
        errors: null
      };
    default:
      return state;
  }
};

export default userReducer;