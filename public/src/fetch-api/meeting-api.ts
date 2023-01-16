import { baseURL } from './config';
import axios from 'axios';
import { MeetingInfo } from '@store/meetings/types';
import { MeetingResponseData, ParticipantCardResponseData, PostMeetingData } from '@models/index';


class MeetingsService {
    baseURL = `${baseURL}/meeting`;
    partipicantsUrl= `${baseURL}/meeting-participant`;
    getMeetings = async (JWT: string) => {
        const headers = {
            'Authorization': `Bearer ${JWT}`
        };
        const res = await axios.get(this.baseURL, {
            headers
        });
        return res;
    };

    getMeetingsOfUserAsIniciator = async(jwt: string, login: string) => {
        const config = {
            headers: {
                'Authorization': `Bearer ${jwt}`
            }
        };
        const ownMeetings = await axios.get(`${this.baseURL}?initiator.login=${login}`, config).then(res => res.data);
        console.log(ownMeetings)
        const meetings: MeetingResponseData[] = await Promise.all(ownMeetings.map(async(item: MeetingResponseData) => {
            const partipicants = await Promise.all((await axios.get<ParticipantCardResponseData[]>(`${this.partipicantsUrl}?meeting.id=${item.id}`, config).then(res => res.data))
                .map((item: ParticipantCardResponseData) => item.personDetails));
            const res = partipicants;
            return {
                ...item,
                participants: partipicants.map(item => {
                    const { person, ...rest } = item;
                    return {
                        ...rest,
                        login: person.login,
                        organization: person.organization,
                        email: person.email,
                    };
                })
            };
        }
        ));
        console.log(meetings)
        const result = meetings.map(meeting => ({
            id: meeting.id,
            dateTimeStart: new Date(meeting.fromDate),
            dateTimeEnd: new Date(meeting.toDate),
            invoker: meeting.initiator.id,
            name: meeting.name,
            place: meeting.place,
            participants: meeting.participants
        }));
        return result ;
    };

    getMeetingsOfUserAsPartipicant = async(jwt: string, login: string) => {
        const config = {
            headers: {
                'Authorization': `Bearer ${jwt}`
            }
        };
        const partipicantCards = await axios.get(`${this.partipicantsUrl}?personDetails.person.login=${login}`, config).then(res => res.data);
        const meetings: MeetingResponseData[] = await Promise.all(partipicantCards.map(async(item: ParticipantCardResponseData) => {
            const partipicants = await Promise.all((await axios.get<ParticipantCardResponseData[]>(`${this.partipicantsUrl}?meeting.id=${item.meeting.id}`, config).then(res => res.data))
                .map((item: ParticipantCardResponseData) => item.personDetails));
            const res = partipicants;
            return {
                ...item.meeting,
                participants: partipicants.map(item => {
                    const { person, ...rest } = item;
                    return {
                        ...rest,
                        login: person.login,
                        organization: person.organization,
                        email: person.email,
                    };
                })
            };
        }
        ));
        const result = meetings.map(meeting => ({
            id: meeting.id,
            dateTimeStart: new Date(meeting.fromDate),
            dateTimeEnd: new Date(meeting.toDate),
            invoker: meeting.initiator.id,
            name: meeting.name,
            place: meeting.place,
            participants: meeting.participants
        }));
        return result ;
    };

    postMeeting = async ({
        JWT,
        MeetingInfo:MeetingInfo
    }: PostMeetingData) => {
        const headers = {
            'Authorization': `Bearer ${JWT}`
        };
        const { name, invoker, place, dateTimeStart, dateTimeEnd, participants } = MeetingInfo;
        const res = await axios.post<MeetingResponseData>(this.baseURL, {
            name,
            place,
            initiator: { id:invoker },
            fromDate: dateTimeStart,
            toDate: dateTimeEnd,
        },
        { headers });

        const { id: meeting_id } = res.data;
        const partipicantsOfMeeting = participants.map(async participant_id => {
            return await axios.post(this.partipicantsUrl, {
                meeting: { id: meeting_id },
                personDetails: { id: participant_id }
            },
            { headers }).then(res => res.data);
        });
        const partipicantCards = await Promise.all(partipicantsOfMeeting);
        return {
            meeting: res,
            partipicantCards
        };
    };

    putMeeting = async ({
        JWT,
        MeetingInfo:MeetingInfo
    }: PostMeetingData) => {
        const headers = {
            'Authorization': `Bearer ${JWT}`
        };
        const { id, name, invoker, place, dateTimeStart, dateTimeEnd, participants } = MeetingInfo;
        const res: MeetingInfo = await axios.put(`${this.baseURL}`, {
            id,
            name,
            place,
            initiator: { id:invoker },
            fromDate: dateTimeStart,
            toDate: dateTimeEnd,
        },
        { headers });

        const partipicantsResponse: ParticipantCardResponseData[] = await (await axios.get(`${this.partipicantsUrl}?meeting.id=${id}`, { headers })).data;
        const partipicantsDelete = partipicantsResponse.map(async item => await axios.delete(`${this.partipicantsUrl}/${item.id}`,{ headers }));
        await Promise.all(partipicantsDelete);
        const partipicantCards = await Promise.all(
            participants.map(async item => await axios.post(this.partipicantsUrl, {
                meeting: { id },
                personDetails: { id:item }
            },
            { headers }))
        );
        return {
            meeting: res,
            partipicantCards
        };
    };

    deleteMeeting = async(jwt: string, meeting_id: number) => {
        const headers = {
            'Authorization': `Bearer ${jwt}`
        };
        const partipicantsResponse: ParticipantCardResponseData[] = await (await axios.get(`${this.partipicantsUrl}?meeting.id=${meeting_id}`, { headers })).data;
        const deleteReq = await Promise.all(partipicantsResponse.map(
            async (item) => await axios.delete(`${this.partipicantsUrl}/${item.id}`, { headers })
        ));
        const res: MeetingInfo = await axios.delete(`${this.baseURL}/${meeting_id}`, { headers });
    };
}

export const MeetingsAPI = new MeetingsService();