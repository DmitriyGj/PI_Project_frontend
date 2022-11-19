import MeetingCard from '@components/meetingCard/MeetingCard';
import {useDispatch, useSelector} from "react-redux";

const MeetingSchedule=()=>{
    const meetings=useSelector(store=>store.meetingsSlice.meetings);

    return(
        <div>
            {meetings.map((meeting) => (
                <div key={meeting.id} style={{"margin-bottom": "38px"}}>
                    <MeetingCard meeting={meeting} />
                </div>))}
        </div>
    );
}

export default MeetingSchedule;
