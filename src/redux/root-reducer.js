import { combineReducers } from 'redux'
import layoutReducer from './layout/layout-reducer'
import recipesReducer from './recipes/recipes-reducer'
import searchReducer from './search/search-reducer'
import userReducer from './user/user-reducer'

export default combineReducers({
  user: userReducer,
  recipes: recipesReducer,
  layout: layoutReducer,
  search: searchReducer
})