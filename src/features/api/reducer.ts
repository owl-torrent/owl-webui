import { combineReducers } from '@reduxjs/toolkit'
import globalSlice from './global.slice'

export default combineReducers({
  [globalSlice.name]: globalSlice.reducer,
})
