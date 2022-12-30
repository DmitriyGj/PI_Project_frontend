import MeetingCard from '@components/meetingCard/MeetingCard';
import Style from './meetingSchedule.module.scss';
import { count } from 'console';
import { useSelector} from 'react-redux';
import { CalendarViewType } from '../../store/meetings/types';
import moment from 'moment';
import { useState } from 'react';

const MeetingSchedule=()=>{
    const viewType=useSelector(store=>store.meetingsSlice.viewType);
    

    const monthEnum={ 0:'января',1:'февраля',2:'марта',3:'апреля',4:'мая',5:'июня',6: 'июля', 7:'августа', 8:'сентября', 9:'октября', 10:'ноября', 11:'декабря'};
    const dayEnum={ 0:'ПН', 1:'ВТ', 2:'СР', 3:'ЧТ',4:'ПТ',5:'СБ',6:'ВС' };

    let dateInterval = { start : '', end : '' };

    const meetings=useSelector(store=>store.meetingsSlice.meetings);
    
    const schedule=[];

    for(let i = 0;  i < meetings.length; i++){
        let isConflict=false;

        if (i!=0) {
            isConflict = meetings[i-1].dateTimeEnd > meetings[i].dateTimeStart;
        }
        if (i!=meetings.length-1) {
            isConflict = isConflict || (meetings[i].dateTimeEnd > meetings[i+1].dateTimeStart);
        }

        let curDate = moment(meetings[i].dateTimeStart);
        
        let monday = moment(new Date(curDate.clone().weekday(0).format('YYYYY/MM/DD')));
        let sunday = moment(new Date(curDate.clone().weekday(6).format('YYYYY/MM/DD')));

        let startMonth = moment(new Date(curDate.clone().startOf('month').format('YYYYY/MM/DD')));
        let endMonth = moment(new Date(curDate.clone().endOf('month').format('YYYYY/MM/DD')));

        let curruntDateInterval = { start: '', end: '' };

        switch(viewType)
        {
                case CalendarViewType.day:
                    curruntDateInterval = {
                        start: curDate.format('YYYY/MM/DD'),
                        end: curDate.format('YYYY/MM/DD'),
                    };
                    break;
                case CalendarViewType.week:
                    curruntDateInterval = {
                        start: monday.format('YYYY/MM/DD'),
                        end: sunday.format('YYYY/MM/DD'),
                    };
                    break;
                case CalendarViewType.month:
                    curruntDateInterval = {
                        start: startMonth.format('YYYY/MM/DD'),
                        end: endMonth.format('YYYY/MM/DD'),
                    };
                    break;
        }

        //кладем промежуток в массив для вывода
        if (i==0 || curruntDateInterval.start !== dateInterval.start && curruntDateInterval.end !== dateInterval.end)
        {
            switch(viewType)
            {
                    case CalendarViewType.day:
                        schedule.push(
                            <div key={meetings[i].id + 'date'}  className={Style.date}>
                                <div>
                                    {
                                        curDate.date() + ' ' + monthEnum[curDate.month()] + ' '
                                    }
                                </div>
                                <div>&#8226;</div>
                                <div>{dayEnum[curDate.day()]}</div>
                            </div>
                        );
                        break;
                    case CalendarViewType.week:
                        schedule.push(
                            <div key={meetings[i].id + 'date'}  className={Style.date}>
                                <div>
                                    {
                                        monday.date() + ' ' + monthEnum[monday.month()] + ' - ' + sunday.date() + ' ' + monthEnum[sunday.month()]
                                    }
                                </div>                               
                            </div>
                        );
                        break;
                    case CalendarViewType.month:
                        schedule.push(
                            <div key={meetings[i].id + 'date'}  className={Style.date}>
                                <div>
                                    {
                                        startMonth.date() + ' ' + monthEnum[startMonth.month()] + ' - ' + endMonth.date() + ' ' + monthEnum[endMonth.month()]
                                    }
                                </div>
                            </div>
                        );
                        break;
            }
        }

        dateInterval = curruntDateInterval;

        schedule.push(
            <div key={meetings[i].id} className={Style.card}>
                <MeetingCard meeting={meetings[i]} conflict={isConflict}/>
            </div>
        );
    }

    return(
        <div className={Style.schedule}>
            {schedule}
        </div>
    );
}

export default MeetingSchedule;
