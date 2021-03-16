import { combineReducers } from '@reduxjs/toolkit'
import connectivitySlice from './connectivity.slice'
import globalSlice from './global.slice'



const connectivityActions = connectivitySlice.actions
export {connectivityActions}

export default combineReducers({
  [connectivitySlice.name]: connectivitySlice.reducer,
  [globalSlice.name]: globalSlice.reducer
})
