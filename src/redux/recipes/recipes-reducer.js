import { RecipesActionTypes } from './recipes-types';

const INITIAL_STATE = {
  clickedRecipe: null,
  errors: null,
};

const recipesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case RecipesActionTypes.SET_CLICKED_RECIPE:
      return {
        ...state,
        clickedRecipe: action.payload,
        errors: null
      };
    default:
      return state;
  }
};

export default recipesReducer;