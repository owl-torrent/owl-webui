import { combineReducers } from "@reduxjs/toolkit"
import apiReducer from '../features/api/reducer'
import uiReducer from '../features/ui/reducer'


const rootReducer = combineReducers({
    api: apiReducer,
    ui: uiReducer
})

export default rootReducer
