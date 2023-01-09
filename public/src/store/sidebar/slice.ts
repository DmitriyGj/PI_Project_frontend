import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { SideBarState } from './types';


const initialState = { opened : false } as SideBarState;

const sidebarSlice = createSlice({
    name: 'sidebar',
    initialState,
    reducers: {
        setOpened(state, action: PayloadAction<boolean>) {
            state.opened = action.payload;
        },
    },

    extraReducers() {}
});

export const { setOpened } = sidebarSlice.actions;
export default sidebarSlice.reducer;
