import { createSelector } from 'reselect'

export const selectLayout = state => state.layout;
export const selectTheme = createSelector(
  [selectLayout],
  layout => layout.theme
);
export const selectLayoutErrors = createSelector(
  [selectLayout],
  layout => layout.errors && layout.errors
);
