import MeetingCard from '@components/meetingCard/MeetingCard';
import Style from './meetingSchedule.module.scss';
import { count } from 'console';
import {useDispatch, useSelector} from 'react-redux';

const MeetingSchedule=()=>{
    const meetings=useSelector(store=>store.meetingsSlice.meetings);
    
    const schedule=[];
    for(let i = 0;  i < meetings.length; i++){
        let isConflict=false;
        if (i!=0)
            isConflict=meetings[i-1]?.dateTimeEnd>meetings[i].dateTimeStart;
        if (i!=meetings.length-1)
            isConflict=isConflict||(meetings[i].dateTimeEnd>meetings[i+1]?.dateTimeStart);
        schedule.push(
            <div  key={meetings[i].id} style={{"margin-bottom": "38px"}}>
                <MeetingCard meeting={meetings[i]} conflict={isConflict}/>
            </div>);
    }

    return(
        <div className={Style.schedule}>
            {schedule}
        </div>
    );
}

export default MeetingSchedule;
