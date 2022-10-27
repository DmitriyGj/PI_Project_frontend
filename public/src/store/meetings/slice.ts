import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { MeetingState, MeetingInfo } from "./types";


const initialState = { meetings : [], editedMeeting : null} as MeetingState

const meetingsSlice = createSlice({
  name: 'meetings',
  initialState,
  reducers: {
    setMeetings(state, action: PayloadAction<MeetingInfo[]>) {
    state.meetings = action.payload
    },
  }
})

// export const {  } = meetingsSlice.actions
export default meetingsSlice.reducer