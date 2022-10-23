import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';

const MeetingManagerStore = configureStore({
    reducer:{
        //здеся вставить рельюсеры из слайсов
    }
});

const SetupStore = () => MeetingManagerStore;
export const wrapper = createWrapper(SetupStore, { debug: true });

export type RootState = ReturnType<typeof MeetingManagerStore.getState>
export type AppDispach = typeof MeetingManagerStore.dispatch;
