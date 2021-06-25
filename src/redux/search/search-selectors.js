import { createSelector } from 'reselect'

export const selectSearch = state => state.search;
export const selectTheme = createSelector(
  [selectSearch],
  search => search.theme
);
export const selectSearchErrors = createSelector(
  [selectSearch],
  search => search.errors && search.errors
);
export const selectTotalPages = createSelector(
  [selectSearch],
  search => search?.totalPages
);
export const selectCurrentPage = createSelector(
  [selectSearch],
  search => search?.currentPage
);
export const selectSearchParams = createSelector(
  [selectSearch],
  search => search?.searchParams
);
