import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { MeetingState, MeetingInfo } from './types';
import { userInfo } from 'os';


const initialState = { meetings : [
    { name:'name1', invoker: 'invoker1', place:'place1', progectName:'progect1', dateTimeStart: new Date(2022, 1,1,2,22), dateTimeEnd: new Date(2022, 1,1,4,44) },
    { name:'name2', invoker: 'invoker2', place:'place2', progectName:'progect2', dateTimeStart: new Date(2022, 1,1,3,33), dateTimeEnd: new Date(2022, 1,1,5,55) }
], editedMeeting : null } as MeetingState;

const meetingsSlice = createSlice({
    name: 'meetings',
    initialState,
    reducers: {
        setMeetings(state, action: PayloadAction<MeetingInfo[]>) {
            state.meetings = action.payload; 
        },
    }
});

// export const {  } = meetingsSlice.actions
export default meetingsSlice.reducer;
