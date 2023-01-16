import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { MeetingState, MeetingInfo, MeetingDateInterval, CalendarViewType } from './types';
import { addMeeting, fetchMeetings, updateMeeting } from './thunk';


const initialState: MeetingState = { meetings : [
    { id: 1, name:'name1', invoker: 'invoker1', place:'place1', link:'', progectName:'progect1', dateTimeStart: new Date(2021, 11,31, 2,2), dateTimeEnd: new Date(2022, 0,5,4,44), participants : [] },
    { id: 2, name:'name2', invoker: 'invoker2', place:'place2', link:'', progectName:'progect2', dateTimeStart: new Date(2022, 0,31, 5,33), dateTimeEnd: new Date(2022, 0,31,5,55), participants : [] },
    { id: 3, name:'name2', invoker: 'invoker2', place:'place2', link:'', progectName:'progect2', dateTimeStart: new Date(2022, 1,1, 5,33), dateTimeEnd: new Date(2022, 1,1,5,55), participants : [] },
    { id: 4, name:'name3', invoker: 'invoker3', place:'place3', link:'', progectName:'progect3', dateTimeStart: new Date(2022, 1,1, 5,54), dateTimeEnd: new Date(2022, 1,1,6,55), participants : [] },
    { id: 5, name:'name3', invoker: 'invoker3', place:'place3', link:'', progectName:'progect3', dateTimeStart: new Date(2022, 1,12, 5,54), dateTimeEnd: new Date(2022, 1,12,6,55), participants : [] },
    { id: 6, name:'name4', invoker: 'invoker4', place:'place4', link:'', progectName:'progect4', dateTimeStart: new Date(2022, 5,2, 7,33), dateTimeEnd: new Date(2022, 5,3,8,5), participants : [] }
], editedMeeting: { id: -1, name:'', invoker: '', place:'', link:'', progectName:'', dateTimeStart: new Date(), dateTimeEnd: new Date(), participants : [] }, interval: null, viewType: CalendarViewType.day };

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
        setViewType(state, action:  PayloadAction<CalendarViewType>) {
            state.viewType = action.payload;
        },
        setEditedMeeting(state, action: PayloadAction<MeetingInfo>) {
            state.editedMeeting = action.payload;
        }
    },
    extraReducers(builder) {
        builder 
            .addCase(fetchMeetings.pending, (state, action)=>{
                state.meetings = [];
            })
            .addCase(fetchMeetings.fulfilled, (state, action)=>{
                const meetings = action.payload;
                state.meetings = meetings;
            })
            .addCase(fetchMeetings.rejected, (state, action)=>{
                console.log(action.payload + ' rejected');
            })
            .addCase(addMeeting.pending,(state, action) => {
                state.meetings = [];
            })
            .addCase(addMeeting.fulfilled, (state,action) => { state.meetings = action.payload;})
            .addCase(updateMeeting.pending, (state, action) => { state.meetings = [];})
            .addCase(updateMeeting.fulfilled, (state,action) => {state.meetings = action.payload;});
    }
});

export const { setMeetings, setInterval, setViewType, setEditedMeeting } = meetingsSlice.actions;
export default meetingsSlice.reducer;
