import { combineReducers } from '@reduxjs/toolkit'
import globalSlice from './slice.global'
import configSlice from './slice.config'
import torrentSlice from './slice.torrents'
import bandwidthSlice from './slice.bandwidth'

export default combineReducers({
  [globalSlice.name]: globalSlice.reducer,
  [configSlice.name]: configSlice.reducer,
  [torrentSlice.name]: torrentSlice.reducer,
  [bandwidthSlice.name]: bandwidthSlice.reducer,
})
