import { RootState } from '@store/index';
import { UserInfo, UserDetailInfo } from './types';

export const getCurrentUserRole = (state: RootState): string => {
    return state.userSlice.currentUser?.role!;
};

export const getCurrentUser = (state: RootState): UserDetailInfo => {
    return state.userSlice.currentUser!;
};

export const getUsers = (state: RootState): UserInfo[] => {
    return state.userSlice.users;
};

export const getEditedMeeting = (state: RootState): UserInfo => {
    return state.meetingsSlice.editedMeeting;
};