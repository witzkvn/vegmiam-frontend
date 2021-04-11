import { LayoutActionTypes } from './layout-types';

export const setThemeAction = (theme) => ({
  type: LayoutActionTypes.SET_THEME,
  payload: theme,
});


