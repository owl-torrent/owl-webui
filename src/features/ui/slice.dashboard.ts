import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../store/store'
import { replaceWholeState } from '../api/actions.stomp'
import { DashboardState } from './types.state'

const initialState: DashboardState = {
  isStartingOrStopping: false
}

const slice = createSlice({
  name: 'dashboard',
  initialState: initialState,
  reducers: {
    setStartingOrStopping: (state, action: PayloadAction<boolean>) => {
      state.isStartingOrStopping = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      replaceWholeState,
      (state) => {
        state.isStartingOrStopping = false
      }
    )
  }
})

const selectDashboard = createSelector<RootState, DashboardState, DashboardState>(state => state.ui.dashboard, s => s)
const selectIsstartingOrStopping = createSelector(selectDashboard, state => state.isStartingOrStopping)

export const dashboardSelectors = {
  selectDashboard,
  selectIsstartingOrStopping
}
export const dashboardActions = slice.actions
export default slice
