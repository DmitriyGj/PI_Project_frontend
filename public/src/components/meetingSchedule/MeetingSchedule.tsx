import MeetingCard from '@components/meetingCard/MeetingCard';
import Style from './meetingSchedule.module.scss';
import { count } from 'console';
import { useSelector} from 'react-redux';
import { CalendarViewType } from '../../store/meetings/types';

const MeetingSchedule=()=>{
    const monthEnum={ 0:'января',1:'ферваля',2:'марта',3:'апреля',4:'мая',5:'июня',6: 'июля', 7:'августа', 8:'сентября', 9:'октября', 10:'ноября', 11:'декабря'};
    const dayEnum={ 0:'ПН', 1:'ВТ', 2:'СР', 3:'ЧТ',4:'ПТ',5:'СБ',6:'ВС' };

    const meetings=useSelector(store=>store.meetingsSlice.meetings);
    
    const schedule=[];
    for(let i = 0;  i < meetings.length; i++){
        let isConflict=false;

        if (i!=0)
            isConflict=meetings[i-1]?.dateTimeEnd>meetings[i].dateTimeStart;

        if (i!=meetings.length-1)
            isConflict=isConflict||(meetings[i].dateTimeEnd>meetings[i+1]?.dateTimeStart);

        const currentCard=new Date(
            meetings[i].dateTimeStart.getFullYear(),
            meetings[i].dateTimeStart.getMonth(),
            meetings[i].dateTimeStart.getDate());
        
        if (i==0 || (meetings[i-1].dateTimeStart.getDate()!==currentCard.getDate() ||
            meetings[i-1].dateTimeStart.getMonth()!==currentCard.getMonth()))
            schedule.push(
                <div className={Style.date}>
                    <div>
                        {currentCard.getDate() +' '+ monthEnum[currentCard.getMonth()]+' '
                        // +' ' +(i!==0 &&  meetings[i-1].dateTimeStart.getFullYear()!==currentCard.getFullYear())?
                        // currentCard.getFullYear():''
                        }
                    </div>
                    <div>&#8226;</div>
                    <div>{dayEnum[currentCard.getDay()]}</div>
                </div>
            );

        schedule.push(
            <div  key={meetings[i].id} className={Style.card}>
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
