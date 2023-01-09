import { RootState } from '@store/index';

export const getOpened = (state: RootState): boolean => {
    return state.sidebarSlice.opened!;
};
