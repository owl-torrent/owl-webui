import { createSelector, createSlice } from '@reduxjs/toolkit'
import { JoalConfig } from '../../modules/api'
import { RootState } from '../../store/store'
import { replaceWholeState, configChanged } from './actions.stomp'


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
      (_, action) => {
        return action.payload.config ? action.payload.config : initialState
      }
    ).addCase(
      configChanged,
      (state, action) => {
        if (!state) {
          return
        }
        return action.payload
      }
    )
  }
})

const selectConfig = createSelector<RootState, JoalConfig, JoalConfig>(state => state.api.config, s => s)

export const configSelectors = {
  selectConfig
}
export default slice
