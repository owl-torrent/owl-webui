import { createSelector, createSlice } from '@reduxjs/toolkit'
import { GlobalState } from '../../modules/api'
import { RootState } from '../../store/store'
import { seedStarted, seedStopped } from './actions.stomp'

import { replaceWholeState } from './utils'

const initialState: GlobalState = { started: false, client: undefined }

const slice = createSlice({
  name: 'global',
  initialState: initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(
      replaceWholeState,
      (state, action) => state = action.payload.global
    ).addCase(
      seedStarted,
      (state, action) => {
        state.started = action.payload.started
        state.client = action.payload.client
      }
    ).addCase(
      seedStopped,
      (state) => {
        state.started = false
        state.client = undefined
      }
    )
  }
})

const selectGlobal = createSelector<RootState, GlobalState, GlobalState>(state => state.api.global, s => s)
const selectIsSeedStarted = createSelector(selectGlobal, state => state.started)

export const globalSelectors = {
  selectGlobal,
  selectIsSeedStarted
}
export default slice
