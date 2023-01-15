import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import thunk from 'redux-thunk';
import userSlice from './users/slice';
import testSlice from './test/slice';
import meetingsSlice from './meetings/slice';
import appSlice from './app/slice';
import sidebarSlice from './sidebar/slice';
import { useDispatch } from 'react-redux';


const MeetingManagerStore = configureStore({
    reducer:{
        userSlice,
        testSlice,
        appSlice,
        meetingsSlice,
        sidebarSlice
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ 
        serializableCheck: false, 
        thunk:{
            extraArgument: thunk
        } }),
});

const SetupStore = () => MeetingManagerStore;
export const wrapper = createWrapper(SetupStore, { debug: true });

export type RootState = ReturnType<typeof MeetingManagerStore.getState>
export type AppDispatch = typeof MeetingManagerStore.dispatch;
export const useAppDispatch = (): AppDispatch => useDispatch<AppDispatch>(); 
