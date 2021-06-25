import { SearchActionTypes } from "./search-types";

export const setTotalPages = (totalPages) => ({
  type: SearchActionTypes.SET_TOTAL_PAGES_RESULTS,
  payload: totalPages,
});
export const setCurrentPage = (currentPage) => ({
  type: SearchActionTypes.SET_CURRENT_PAGE,
  payload: currentPage,
});
export const setSearchParams = (searchParamsObject) => {
  return {
    type: SearchActionTypes.SET_SEARCH_PARAMS,
    payload: searchParamsObject,
  }
};




