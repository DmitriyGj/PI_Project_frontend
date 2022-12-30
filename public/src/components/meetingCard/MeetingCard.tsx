import Style from './meetingCard.module.scss';
import React from 'react';
import {useSelector} from 'react-redux';
import { CalendarViewType } from '../../store/meetings/types';

const MeetingCard=({ meeting, conflict=false})=>
{
    const viewType=useSelector(store=>store.meetingsSlice.viewType);
    const { name, invoker, place, progectName, dateTimeStart, dateTimeEnd , participants }=meeting;
    const monthEnum={ 0:'января',1:'февраля',2:'марта',3:'апреля',4:'мая',5:'июня',6: 'июля', 7:'августа', 8:'сентября', 9:'октября', 10:'ноября', 11:'декабря'};

    const duration = (start: Date, end: Date)=>{
        const hours=Math.trunc((end-start)/(1000*3600));
        const minutes=(end-start)/(1000*60)%60;
        return (hours?(hours+' ч. '):'')+(minutes?minutes+' мин.':'');
    };

    const showTime = (time: Date)=>
    {
        return (time.getHours() ? getZero(time.getHours()) : '00')+':'+(time.getMinutes() ? getZero(time.getMinutes()) : '00');
    };

    const getZero=(num: Number)=>
    {
        return (num<10 ? '0'+num:num);
    };
    
    const date = (currentDate: Date)=>{
        return currentDate.getDate() +' '+ monthEnum[currentDate.getMonth()];
    };

    const start=showTime(dateTimeStart);
    const end=showTime(dateTimeEnd);
    const haveConflict=conflict?(Style.redStyle):(Style.emptyStyle);

    return (
        <div className={Style.meetingCard} style={conflict?({ 'border':'2px solid #FF4D4F' }):({ 'border':'2px solid #F0F0F0' })}>
            <div className={Style.columns}>
                <div>{name}</div>
                <div className={Style.secondLine}>{progectName}</div>
                <div></div>
            </div>

            <div className={Style.columns}>
                <div className={Style.rightSide}>

                    <div className={Style.row}>
                        <div className={Style.secondLine}> 
                            {(viewType==CalendarViewType.day?'':date(dateTimeStart)) }
                        </div>
                        <div className={haveConflict}>
                            {start}
                        </div>
                    </div>
                    <div className={Style.secondLine}> {duration(dateTimeStart, dateTimeEnd)}</div>
                    <div className={Style.row}>
                        <div className={Style.secondLine}> 
                            {date(dateTimeStart) !== date(dateTimeEnd) ? date(dateTimeEnd):''}
                        </div>
                        <div className={haveConflict}>
                            {end}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default MeetingCard;
