import { RootState } from '@store/index';
import { AppStatus } from './types';

export const getAppStatusSelectors = (state: RootState): AppStatus => {
    return state.appSlice.status!;
};
