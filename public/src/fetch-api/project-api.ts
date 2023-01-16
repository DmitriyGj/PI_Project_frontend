import { baseURL } from './config';
import axios from 'axios';
import { MeetingInfo } from '@store/meetings/types';
import { MeetingResponseData, ParticipantCardResponseData, PostMeetingData } from '@models/index';


class MeetingsService {
    baseURL = `${baseURL}/project`;
    partipicantsUrl= `${baseURL}/project-participant`;
    getMeetings = async (JWT: string) => {
        const headers = {
            'Authorization': `Bearer ${JWT}`
        };
        const res = await axios.get(this.baseURL, {
            headers
        });
        const projects = res.data;
        const fullInfo = projects.map()
        return res;
    };

  
}

export const MeetingsAPI = new MeetingsService();
