import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { MeetingState, MeetingInfo, MeetingDateInterval, CalendarViewType } from './types';
import { fetchMeetings } from './thunk';


const initialState: MeetingState = { meetings : [], editedMeeting: null, interval: null, viewType: CalendarViewType.day };

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
            });
    }
});

export const { setMeetings, setInterval, setViewType, setEditedMeeting } = meetingsSlice.actions;
export default meetingsSlice.reducer;
