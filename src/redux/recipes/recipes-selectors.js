import { createSelector } from 'reselect'

export const selectRecipes = state => state.recipes;

export const selectRecipesErrors = createSelector(
  [selectRecipes],
  recipes => recipes.errors && recipes.errors
);
export const selectRecipesArray = createSelector(
  [selectRecipes],
  recipes => recipes.recipesArray && recipes.recipesArray
);
export const selectClickedRecipe = createSelector(
  [selectRecipes],
  recipes => recipes.clickedRecipe && recipes.clickedRecipe
);
