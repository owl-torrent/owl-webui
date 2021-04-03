import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { GlobalState } from '../../modules/api/types'
import { RootState } from '../../store/store'

import { SeedStartedPayload, SeedStoppedPayload } from './types'
import { replaceWholeState } from './utils'

const initialState: GlobalState = { started: false }

const slice = createSlice({
  name: 'global',
  initialState: initialState,
  reducers: {
    seedStarted: (state, action: PayloadAction<SeedStartedPayload>) => {
      state.started = action.payload.global.started
    },
    seedStopped: (state, action: PayloadAction<SeedStoppedPayload>) => {
      state.started = false
    }
  },
  extraReducers: (builder) => {
    builder.addCase(
      replaceWholeState,
      (state, action) => state = action.payload.global
    )
  }
})

const selectGlobal = createSelector<RootState, GlobalState, GlobalState>(state => state.api.global, s => s)
const selectIsSeedStarted = createSelector(selectGlobal, state => state.started)

export const globalSelectors = {
  selectGlobal,
  selectIsSeedStarted
}
export const globalActions = slice.actions
export default slice
