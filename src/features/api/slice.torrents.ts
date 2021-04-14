import { createSelector, createSlice } from '@reduxjs/toolkit'
import { TorrentMapState } from '../../modules/api'
import { RootState } from '../../store/store'
import { replaceWholeState, seedStopped, torrentAdded, torrentChanged, torrentRemoved } from './actions.stomp'

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
      (_, action) => {
        return action.payload.torrents ? action.payload.torrents : initialState
      }
    )
    .addCase(
      seedStopped,
      () => {
        return initialState
      }
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
