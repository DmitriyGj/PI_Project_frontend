import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { authUser } from './thunk';
import { UserDetailInfo, UsersState, UserRole } from './types';


const initialState = { users : [{ id:1,name:'Иван Иванов',email:'zxc2006@mail.ru',login:'ivanpro',organization:'Amazon'},
{id:2,name:'Владислав Свинотов',email:'turbovoin@mail.ru',login:'vladik',organization:'Google'}], 
currentUser : { id:2,name:'Владислав Свин',email:'turbovoin@mail.ru',login:'vladik',organization:'Google', role: UserRole.ADMIN } } as UsersState;

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setCurrentUser(state, action: PayloadAction<UserDetailInfo>) {
            state.currentUser = action.payload;
        },
    },

    extraReducers(builder) {
        builder 
            .addCase(authUser.pending, (state, action)=>{
            // console.log(action.payload + "pending")

            })
            .addCase(authUser.fulfilled, (state, action)=>{
                console.log(action.payload);


            })
            .addCase(authUser.rejected, (state, action)=>{
                console.log(action.payload + ' rejected');

            });
    }
});

export const { setCurrentUser } = usersSlice.actions;
export default usersSlice.reducer;
