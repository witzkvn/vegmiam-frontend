import { RecipesActionTypes } from './recipes-types';

export const setClickedRecipe = (recipe) => ({
  type: RecipesActionTypes.SET_CLICKED_RECIPE,
  payload: recipe,
});


