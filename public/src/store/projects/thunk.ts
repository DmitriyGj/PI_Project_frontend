import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppState } from '@store/app/types';
import { RootState } from '..';
import { getCurrentUser } from './selectors';
import { MeetingsAPI } from 'fetch-api/meeting-api';


export const fetchMeetings = createAsyncThunk('projects/fetch', 
    async (_, { getState, dispatch }) => {
        const state = getState() as RootState;
        const user = getCurrentUser(state);
        const meetings = await MeetingsAPI.getMeetingsOfUserAsPartipicant(user.jwt, user.login);
        const ownMeetings = await MeetingsAPI.getMeetingsOfUserAsIniciator(user.jwt, user.login);

        return [ ...meetings, ...ownMeetings.filter(item => !meetings.some(m_item => m_item.id !== item.id)) ];
    }
);

// export const addMeeting = createAsyncThunk('meetings/post', 
//     async(MeetingInfo: any, { getState, dispatch }) => {
//         const state = getState() as RootState;
//         const user = getCurrentUser(state);
//         const res = await MeetingsAPI.postMeeting({
//             JWT: user.jwt,
//             MeetingInfo: MeetingInfo
//         });
//         const meetings = await MeetingsAPI.getMeetingsOfUserAsPartipicant(user.jwt, user.login);
//         const ownMeetings = await MeetingsAPI.getMeetingsOfUserAsIniciator(user.jwt, user.login);

//         return [ ...meetings, ...ownMeetings.filter(item => !meetings.some(m_item => m_item.id !== item.id)) ];
//     });

// export const updateMeeting = createAsyncThunk('meetings/update', 
//     async(MeetingInfo: any, { getState, dispatch }) => {
//         const state = getState() as RootState;
//         const user = getCurrentUser(state);
//         const res = await MeetingsAPI.putMeeting({
//             JWT: user.jwt,
//             MeetingInfo: MeetingInfo
//         });
//         const meetings = await MeetingsAPI.getMeetingsOfUserAsPartipicant(user.jwt, user.login);
//         const ownMeetings = await MeetingsAPI.getMeetingsOfUserAsIniciator(user.jwt, user.login);

//         return [ ...meetings, ...ownMeetings.filter(item => !meetings.some(m_item => m_item.id !== item.id)) ];
//     });

// export const removeMeeting = createAsyncThunk('meetings/delete', 
//     async(meeting_id: number, { getState, dispatch }) => {
//         const state = getState() as RootState;
//         const user = getCurrentUser(state);
//         const res = await MeetingsAPI.deleteMeeting(user.jwt, meeting_id);

//         const meetings = await MeetingsAPI.getMeetingsOfUserAsPartipicant(user.jwt, user.login);
//         const ownMeetings = await MeetingsAPI.getMeetingsOfUserAsIniciator(user.jwt, user.login);

//         return [ ...meetings, ...ownMeetings.filter(item => !meetings.some(m_item => m_item.id !== item.id)) ];
//     });
