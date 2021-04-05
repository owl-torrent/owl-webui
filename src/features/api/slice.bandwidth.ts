import { createSelector, createSlice } from '@reduxjs/toolkit'
import { Bandwidth } from '../../modules/api/types'
import { RootState } from '../../store/store'
import { bandwidthDistributionChanged, bandwidthRangeChanged } from './actions.stomp'
import { replaceWholeState } from './utils'

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
      (state, action) => state = action.payload.bandwidth
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

export const torrentsSelectors = {
  selectBandwidth
}
export default slice
