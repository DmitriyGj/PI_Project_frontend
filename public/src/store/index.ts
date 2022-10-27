import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';

import userSlice from './users/slice';
import testSlice from './test/slice';
import meetingsSlice from './meetings/slice';
import appSlice from './app/slice';


const MeetingManagerStore = configureStore({
    reducer:{
        userSlice,
        testSlice,
        appSlice,
        meetingsSlice
    }
});

const SetupStore = () => MeetingManagerStore;
export const wrapper = createWrapper(SetupStore, { debug: true });

export type RootState = ReturnType<typeof MeetingManagerStore.getState>
export type AppDispach = typeof MeetingManagerStore.dispatch;
