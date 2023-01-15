import { MeetingInfo } from '@store/meetings/types';
import { UserRole } from '@store/users/types';

export type AuthData = {
  login: string
  password: string
}

export type OrganiztionInfo = {
  id: number
  name: string
} 

export type UserInfo = {
  id: number
  login: string
  email: string
  password: string
  role: UserRole
  organization: OrganiztionInfo
} 

export type UserResponseData = UserInfo

export type UserDetailsResponseData = {
    id: number
    person: UserResponseData
    name: string
    lastName: string
    patronymic: string
    phone: string
}

export type PostMeetingData = {
  JWT: string
  MeetingInfo: MeetingInfo
}

export type MeetingResponseData ={
  id: number
  name: string
  fromDate: string
  toDate: string
  place: string
  initiator: UserResponseData
}

export type ParticipantCardResponseData = {
  id: number
  meeting: MeetingResponseData
  personDetails: {
      id: number
      person: UserInfo
      name: string
      lastName: string
      patronymic: string
      phone: string
  }
}
