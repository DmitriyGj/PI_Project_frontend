import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { MeetingState, MeetingInfo, MeetingDateInterval, CalendarViewType} from './types';


const initialState = { meetings : [
    { id: 1, name:'name1', invoker: 'invoker1', place:'place1', progectName:'progect1', dateTimeStart: new Date(2022, 1,1, 2,22), dateTimeEnd: new Date(2022, 1,1,4,44) },
    { id: 2, name:'name2', invoker: 'invoker2', place:'place2', progectName:'progect2', dateTimeStart: new Date(2022, 1,1, 5,33), dateTimeEnd: new Date(2022, 1,1,5,55) },
    { id: 3, name:'name3', invoker: 'invoker3', place:'place3', progectName:'progect3', dateTimeStart: new Date(2022, 1,1, 5,54), dateTimeEnd: new Date(2022, 1,1,6,55) },
    { id: 4, name:'name4', invoker: 'invoker4', place:'place4', progectName:'progect4', dateTimeStart: new Date(2022, 1,1, 7,33), dateTimeEnd: new Date(2022, 1,1,8,55) }
], editedMeeting : null } as MeetingState;

const meetingsSlice = createSlice({
    name: 'meetings',
    initialState,
    reducers: {
        setMeetings(state, action: PayloadAction<MeetingInfo[]>) {
            state.meetings = action.payload;
        },
        setInterval(state, action: PayloadAction<MeetingDateInterval>) {
            state.interval = action.payload;
        },
        setViewType(state, action: PayloadAction<CalendarViewType>) {
            state.viewType = action.payload;
        },
    }
});

export const { setMeetings, setInterval, setViewType } = meetingsSlice.actions;
export default meetingsSlice.reducer;
