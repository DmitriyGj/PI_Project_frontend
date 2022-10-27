import { Action, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { authUser, fetchUsers} from "./thunk"
import { UserInfo, UserDetailInfo, UsersState } from "./types";


const initialState = { users : [], currentUser : null} as UsersState

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setCurrentUser(state, action: PayloadAction<UserDetailInfo>) {
    state.currentUser = action.payload
    },
  },

  extraReducers(builder) {
    builder 
        .addCase(authUser.pending, (state, action)=>{
            // console.log(action.payload + "pending")

        })
        .addCase(authUser.fulfilled, (state, action)=>{
            console.log(action.payload)


        })
        .addCase(authUser.rejected, (state, action)=>{
            console.log(action.payload + " rejected")

        })
  }
})

export const { setCurrentUser } = usersSlice.actions
export default usersSlice.reducer