import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppState } from '@store/app/types';
import { RootState } from '..';
import { getCurrentUser } from './selectors';
import { MeetingsAPI } from 'fetch-api/meeting-api';

export const authUser = createAsyncThunk('users/authUser', 
    async (value: number, { getState, dispatch }) => {
        return value + 1;
    }
);

export const fetchMeetings = createAsyncThunk('meetings/fetch', 
    async (_, { getState, dispatch }) => {
        const state = getState() as RootState;
        const user = getCurrentUser(state);
        console.log(user)
        const meetings = await MeetingsAPI.getMeetingsOfUserAsPartipicant(user.jwt, user.login);
        return meetings;
    }
);
