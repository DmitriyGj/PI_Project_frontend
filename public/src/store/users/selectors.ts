import { RootState } from '@store/index';
import { UserInfo, UserDetailInfo, UserRole } from './types';

export const getCurrentUserRole = (state: RootState): UserRole | undefined => {
    return state.userSlice.currentUser?.role;
};

export const getCurrentUser = (state: RootState): UserDetailInfo | null => {
    return state.userSlice.currentUser;
};

export const getUsers = (state: RootState): UserInfo[] => {
    return state.userSlice.users;
};
