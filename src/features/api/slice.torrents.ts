import { createSelector, createSlice } from '@reduxjs/toolkit'
import { TorrentMapState } from '../../modules/api'
import { RootState } from '../../store/store'
import { torrentAdded, torrentChanged, torrentRemoved } from './actions.stomp'
import { replaceWholeState } from './utils'

let initialState: TorrentMapState = {
}

const slice = createSlice({
  name: 'torrents',
  initialState: initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(
      replaceWholeState,
      (state, action) => state = action.payload.torrents
    ).addCase(
      torrentAdded,
      (state, action) => {
        state[action.payload.infohash] = action.payload
      }
    ).addCase(
      torrentChanged,
      (state, action) => {
        state[action.payload.infohash] = action.payload
      }
    ).addCase(
      torrentRemoved,
      (state, action) => {
        delete state[action.payload.infohash]
      }
    )
  }
})

const selectTorrents = createSelector<RootState, TorrentMapState, TorrentMapState>(state => state.api.torrents, s => s)

export const torrentsSelectors = {
  selectTorrents
}
export default slice
