import { UserInfo } from '../users/types';

export type MeetingInfo = {
    id: number
    name: string
    invoker: string
    place: string
    link: string
    progectName: string 
    dateTimeStart: Date
    dateTimeEnd: Date
    participants: string[]
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
    editedMeeting: MeetingInfo 
    interval: MeetingDateInterval | null
    viewType: CalendarViewType 
}
