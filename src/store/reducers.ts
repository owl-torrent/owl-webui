import { combineReducers } from "@reduxjs/toolkit"
import apiReducer from '../features/api/reducer'


const rootReducer = combineReducers({
    api: apiReducer
})

export default rootReducer
