import { createSlice } from '@reduxjs/toolkit'
import {GlobalState} from '../../api/types'

const initialState: GlobalState = { started: false }

export default createSlice({
  name: 'global',
  initialState: initialState,
  reducers: {
    
  }
})
