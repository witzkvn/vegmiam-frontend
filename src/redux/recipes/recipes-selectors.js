import { createSelector } from 'reselect'

export const selectRecipes = state => state.recipes;
export const selectTheme = createSelector(
  [selectRecipes],
  recipes => recipes.theme
);
export const selectRecipesErrors = createSelector(
  [selectRecipes],
  recipes => recipes.errors && recipes.errors
);
