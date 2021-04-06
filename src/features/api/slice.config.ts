import { createSelector, createSlice } from '@reduxjs/toolkit'
import { JoalConfig } from '../../modules/api'
import { RootState } from '../../store/store'
import { configChanged } from './actions.stomp'

import { replaceWholeState } from './utils'

let initialState: JoalConfig = {
  needRestartToTakeEffect: false,
  runtimeConfig: {
    client: 'none',
    minimumBytesPerSeconds: 0,
    maximumBytesPerSeconds: 0
  }
}

const slice = createSlice({
  name: 'config',
  initialState: initialState,
  reducers: {
  },
  'extraReducers': (builder) => {
    builder.addCase(
      replaceWholeState,
      (state, action) => state = action.payload.config
    ).addCase(
      configChanged,
      (state, action) => {
        if (!state) {
          return
        }
        state = action.payload
      }
    )
  }
})

const selectConfig = createSelector<RootState, JoalConfig, JoalConfig>(state => state.api.config, s => s)

export const configSelectors = {
  selectConfig
}
export default slice
