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
        return meetings.map(({
            fromDate,
            id,
            initiator,
            name,
            place,
            toDate
        }) => ({
            id,
            dateTimeStart: new Date(fromDate),
            dateTimeEnd: new Date(toDate),
            invoker: initiator.id,
            name,
            place,
            partipicnats: []
        }));
    };

    postMeeting = async ({
        JWT,
        MeetingInfo:MeetingInfo
    }: PostMeetingData) => {
        const headers = {
            'Authorization': `Bearer ${JWT}`
        };
        const { name, invoker, place, dateTimeStart, dateTimeEnd, participants } = MeetingInfo;
        const res: MeetingInfo = await axios.post(this.baseURL, {
            name,
            place,
            iniciator_id: invoker,
            fromDate: dateTimeStart,
            toDate: dateTimeEnd,
        },
        { headers });

        const { id: meeting_id } = res;
        //res.id - айди созданной встречи, после нужно создать карточки участников на освное массива partipicants
        const partipicantsOfMeeting = participants.map(async participant => {
            const { id } = participant;
            return await axios.post(this.partipicantsUrl, {
                meeting_id,
                person_details_id: id
            },
            { headers }).then(res => res.data);
        });
        const partipicantCards = await Promise.all(partipicantsOfMeeting);
        return {
            meeting: res,
            partipicantCards
        };
    };
}

export const MeetingsAPI = new MeetingsService();
