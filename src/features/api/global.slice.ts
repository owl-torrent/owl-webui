import { createSlice } from '@reduxjs/toolkit'
import {GlobalState} from '../../modules/api/types'

const initialState: GlobalState = { started: false }

export default createSlice({
  name: 'global',
  initialState: initialState,
  reducers: {
    
  }
})
