import { RootState } from '@store/index';
import { UserInfo, UserDetailInfo } from './types';
import moment from 'moment';

export const getCurrentUserRole = (state: RootState): string => {
    return state.userSlice.currentUser?.role!;
};

export const getCurrentUser = (state: RootState): UserDetailInfo => {
    return state.userSlice.currentUser!;
};

export const getUsers = (state: RootState): UserInfo[] => {
    return state.userSlice.users;
};

export const getEditedMeeting = (state: RootState) => {
    return state.meetingsSlice.editedMeeting;
};

export const getMeetings = (state: RootState) => {
    const { interval, meetings } = state.meetingsSlice;
    const sortFunction = (a,b) => {
        const moment_a = moment(a.dateTimeStart),
            moment_b = moment(b.dateTimeStart);
        return moment_a.isBefore(moment_b) ? 1 : moment_a.isAfter(moment_b) ? -1 : 0;
    } ;

    if(!interval || (!interval.start && !interval.end)) {
        return [ ...meetings ].sort(sortFunction).reverse() ;
    }
    else if(interval.start && !interval.end) {
        return [ ...meetings ].filter(item => {
            let { dateTimeStart } = item;
            dateTimeStart = new Date(dateTimeStart);
            return dateTimeStart >= interval.start;
        }).sort(sortFunction).reverse();
    }
    else if (!interval.start && interval.end){
        return [ ...meetings ].filter(item => {
            let { dateTimeEnd } = item;
            dateTimeEnd = new Date(dateTimeEnd);
            return dateTimeEnd >= interval.end;
        }).sort(sortFunction).reverse();
    }
    return [ ...meetings ].filter(item => {
        let { dateTimeStart, dateTimeEnd } = item;
        dateTimeStart = new Date(dateTimeStart);
        dateTimeEnd = new Date(dateTimeEnd);
        return dateTimeStart >= interval?.start && dateTimeEnd <= interval?.end;
    }).sort(sortFunction).reverse();
};
