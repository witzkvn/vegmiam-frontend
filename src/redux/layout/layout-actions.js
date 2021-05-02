import { LayoutActionTypes } from './layout-types';

export const setThemeAction = (theme) => ({
  type: LayoutActionTypes.SET_THEME,
  payload: theme,
});

export const openPopupMessageAction = (status, message) => ({
  type: LayoutActionTypes.OPEN_POPUP_MESSAGE,
  payload: { status, message },
});

export const closePopupMessageAction = () => ({
  type: LayoutActionTypes.CLOSE_POPUP_MESSAGE,
});

export const openOverlayMessageAction = () => ({
  type: LayoutActionTypes.OPEN_OVERLAY_MESSAGE,
});

export const closeOverlayMessageAction = () => ({
  type: LayoutActionTypes.CLOSE_OVERLAY_MESSAGE,
});




