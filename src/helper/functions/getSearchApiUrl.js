export const getSearchApiUrl = (searchParamsObj) => {
  if (searchParamsObj) {
    return `${searchParamsObj?.searchWords ? ('&query=' + encodeURI(searchParamsObj.searchWords)) : ''}${searchParamsObj?.searchDifficulty ? ('&difficulty=' + searchParamsObj.searchDifficulty) : ''}${searchParamsObj?.searchDuration ? ('&time[lte]=' + searchParamsObj.searchDuration) : ''}${searchParamsObj?.searchOrder ? ('&sort=' + searchParamsObj.searchOrder) : ''}${searchParamsObj?.searchCategory ? ('&category=' + searchParamsObj.searchCategory) : ''}${searchParamsObj?.searchPage ? ('&page=' + searchParamsObj.searchPage) : ''}`.trim()
  }
  return ""
}