import { combineReducers } from '@reduxjs/toolkit'
import dashboardSlice from './slice.dashboard'

export default combineReducers({
  [dashboardSlice.name]: dashboardSlice.reducer,
})
