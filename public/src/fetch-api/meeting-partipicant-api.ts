import { baseURL } from './config';
import axios from 'axios';
import { MeetingInfo } from '@store/meetings/types';
import JWT from 'jsonwebtoken';

type PostMeetingData = {
    JWT: string
    MeetingInfo: MeetingInfo
}

class MeetingsService {
    baseURL = `${baseURL}/meeting-participant`;
    getPartipicant = async (JWT: string) => {
        const headers = {
            'Authorization': `Bearer ${JWT}`
        };
        const res = await axios.get(this.baseURL, {
            headers
        });
        return res;
    };

    postPartipicant = async ({
        JWT:string,
        MeetingInfo:MeetingInfo
    }: PostMeetingData) => {
        const headers = {
            'Authorization': `Bearer ${JWT}`
        };
        const { name, invoker, place, dateTimeStart, dateTimeEnd, participants } = MeetingInfo;
        const res: MeetingInfo = await axios.post(this.baseURL, {
            name,
            iniciator_id: invoker,
            place,
            fromDate: dateTimeStart,
            toDate: dateTimeEnd,
        },
        { headers });

        const { id: meeting_id } = res;
        //res.id - айди созданной встречи, после нужно создать карточки участников на освное массива partipicants
        const partipicantsOfMeeting = participants.map(participant => {
            const { id } = participant;

        });
        return res;
    };
}

export const BaseAPI = new MeetingsService();
