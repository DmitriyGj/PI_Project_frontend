import { UserInfo } from '../users/types';

export type MeetingInfo = {
    name: string
    invoker: string
    place: string
    progectName: string 
    dateTimeStart: Date
    dateTimeEnd: Date
    participants: UserInfo[]
}

export interface MeetingState {
    meetings: MeetingInfo[]
    editedMeeting: MeetingInfo | null
}
