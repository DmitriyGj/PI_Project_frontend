import { createAsyncThunk } from '@reduxjs/toolkit';
import { setCurrentUser } from './slice';
import { UserDetailInfo, UserInfo } from './types';

export const authUser = createAsyncThunk('users/authUser', 
    async (value: number, { getState, dispatch }) => {
        return value + 1;
    }
);


export const fetchUsers = createAsyncThunk('users/fetchUsers',
    async (value: number, { getState, dispatch }) => {
        const data: UserDetailInfo = {
            id: 0,
            name: '',
            email: '',
            login: '',
            role: '',
            organization: ''
        };
        dispatch(setCurrentUser(data));
        return value + 1;
    }
);
