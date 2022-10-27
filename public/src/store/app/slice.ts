import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { } from "./thunk"
import { AppState, AppStatus } from "./types";


const initialState = { initial : false, status : null } as AppState;

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
      setAppStatus(state, action: PayloadAction<AppStatus>) {
          state.status = action.payload;
    },
  },

  extraReducers() {

  }
})

export const { setAppStatus } = appSlice.actions
export default appSlice.reducer