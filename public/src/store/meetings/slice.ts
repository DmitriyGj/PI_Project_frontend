import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { MeetingState, MeetingInfo, MeetingDateInterval, CalendarViewType} from './types';


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
        setViewType(state, action: PayloadAction<CalendarViewType>) {
            state.viewType = action.payload;
        },
    }
});

export const { setMeetings, setInterval, setViewType } = meetingsSlice.actions;
export default meetingsSlice.reducer;
