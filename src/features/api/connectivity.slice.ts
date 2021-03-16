import { createSlice } from '@reduxjs/toolkit'

export interface ConnectivityState {
    http: boolean
    ws: boolean
}

const initialState: ConnectivityState = {
    http: false,
    ws: false
}

export default createSlice({
  name: 'connectivity',
  initialState: initialState,
  reducers: {
    httpConnected(state) {
      state.http = true
    },
    httpDisconnected(state) {
      state.http = false
    },
    wsConnected(state) {
      state.ws = true
    },
    wsDisconnected(state) {
      state.ws = false
    }
  }
})
