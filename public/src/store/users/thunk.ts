import { createAsyncThunk } from '@reduxjs/toolkit';
import { setCurrentUser } from './slice';
import { UserDetailInfo, UserRole } from './types';
import { BaseAPI } from 'fetch-api/base-api';
import { setCookie } from 'cookies-next';
import { MeetingsAPI } from 'fetch-api/meeting-api';
import { setMeetings } from '@store/meetings/slice';

type AuthData = {
    login: string
    password: string
}

export const authUser = createAsyncThunk('users/authUser', 
    async ({ login, password }: AuthData, { getState, dispatch, rejectWithValue }) => {
        const user = await BaseAPI.authRequest({ login, password })
            .then(response =>response.data)
            .catch((error) => {
                return rejectWithValue(error.message);
            });
        setCookie('user', user);
        return user;
    }
);

export const logoutUser = createAsyncThunk('users/logoutUser', 
    async (_, { getState, dispatch, rejectWithValue }) => {
        localStorage.removeItem('user');
        return null;
    }
);


export const fetchUsers = createAsyncThunk('users/fetchUsers',
    async (value: number, { getState, dispatch }) => {
        const data: UserDetailInfo = {
            id: 0,
            name: '',
            email: '',
            login: '',
            role: UserRole.NONE,
            organization: ''
        };
        dispatch(setCurrentUser(data));
        return value + 1;
    }
);
