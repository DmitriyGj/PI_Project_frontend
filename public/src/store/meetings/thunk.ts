import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppState } from '@store/app/types';
import { RootState } from '..';
import { getCurrentUser } from './selectors';
import { MeetingsAPI } from 'fetch-api/meeting-api';
import { setMeetings } from './slice';

export const authUser = createAsyncThunk('users/authUser', 
    async (value: number, { getState, dispatch }) => {
        return value + 1;
    }
);

export const fetchMeetings = createAsyncThunk('meetings/fetch', 
    async (_, { getState, dispatch }) => {
        const state = getState() as RootState;
        const user = getCurrentUser(state);
        console.log(user);
        const meetings = await MeetingsAPI.getMeetingsOfUserAsPartipicant(user.jwt, user.login);
        return meetings;
    }
);

export const addMeeting = createAsyncThunk('meetings/post', 
    async(MeetingInfo: any, { getState, dispatch }) => {
        const state = getState() as RootState;
        const user = getCurrentUser(state);
        const res = await MeetingsAPI.postMeeting({
            JWT: user.jwt,
            MeetingInfo: MeetingInfo
        });
        const newMeetings = await MeetingsAPI.getMeetingsOfUserAsPartipicant(user.jwt, user.login);
        return newMeetings;
    });

export const updateMeeting = createAsyncThunk('meetings/update', 
    async(MeetingInfo: any, { getState, dispatch }) => {
        const state = getState() as RootState;
        const user = getCurrentUser(state);
        const res = await MeetingsAPI.putMeeting({
            JWT: user.jwt,
            MeetingInfo: MeetingInfo
        });
        const newMeetings = await MeetingsAPI.getMeetingsOfUserAsPartipicant(user.jwt, user.login);
        return newMeetings;
    });

export const removeMeeting = createAsyncThunk('meetings/delete', 
    async(meeting_id: number, { getState, dispatch }) => {

    });
