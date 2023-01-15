import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { authUser } from './thunk';
import { UserDetailInfo, UsersState, UserRole } from './types';
import { getCookie } from 'cookies-next';

const initialState = { 
    users : [ ], 
    currentUser :  null 
} as UsersState;

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setCurrentUser(state, action: PayloadAction<UserDetailInfo | null>) {
            state.currentUser = action.payload;
        },
        logoutUser(state ) {
            state.currentUser = null;
        }
    },

    extraReducers(builder) {
        builder 
            .addCase(authUser.pending, (state, action)=>{
            // console.log(action.payload + "pending")

            })
            .addCase(authUser.fulfilled, (state, action)=>{
                const user = action.payload;
                state.currentUser = user;
            })
            .addCase(authUser.rejected, (state, action)=>{
                console.log(action.payload + ' rejected');

            });
    }
});

export const { setCurrentUser } = usersSlice.actions;
export default usersSlice.reducer;
