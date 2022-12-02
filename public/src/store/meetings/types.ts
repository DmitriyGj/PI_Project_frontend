import { UserInfo } from '../users/types';

export type MeetingInfo = {
    name: string
    invoker: string
    place: string
    date: Date
    participants: UserInfo[]
}

export type MeetingDateInterval = {
    start?: Date | null
    end?: Date | null
}
export enum CalendarViewType  {
    day,
    week,
    month
}
export interface MeetingState {
    meetings: MeetingInfo[]
    editedMeeting: MeetingInfo | null
    interval: MeetingDateInterval | null
    viewType: CalendarViewType 
}
