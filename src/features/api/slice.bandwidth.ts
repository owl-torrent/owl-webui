import { createSelector, createSlice } from '@reduxjs/toolkit'
import { Bandwidth } from '../../modules/api'
import { RootState } from '../../store/store'
import { replaceWholeState, bandwidthDistributionChanged, bandwidthRangeChanged, seedStopped } from './actions.stomp'

let initialState: Bandwidth = {
  currentBandwidth: 0,
  torrents: {}
}

const slice = createSlice({
  name: 'bandwidth',
  initialState: initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(
      replaceWholeState,
      (_, action) => {
        return action.payload.bandwidth ? action.payload.bandwidth : initialState
      }
    ).addCase(
      seedStopped,
      () => {
        return initialState
      }
    ).addCase(
      bandwidthRangeChanged,
      (state, action) => {
        state.currentBandwidth = action.payload.currentBandwidth
      }
    ).addCase(
      bandwidthDistributionChanged,
      (state, action) => {
        state.torrents = action.payload
      }
    )
  }
})

const selectBandwidth = createSelector<RootState, Bandwidth, Bandwidth>(state => state.api.bandwidth, s => s)

export const bandwidthSelectors = {
  selectBandwidth
}
export default slice
