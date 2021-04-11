import { combineReducers } from 'redux'
import layoutReducer from './layout/layout-reducer'
import userReducer from './user/user-reducer'

export default combineReducers({
  user: userReducer,
  layout: layoutReducer
})