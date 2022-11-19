import Style from './meetingCard.module.scss';
import React from 'react';

const MeetingCard=({ meeting, chooseDay=true, conflict=false })=>
{
    const { name, invoker, place, progectName, dateTimeStart, dateTimeEnd , participants }=meeting;

    const duration = (start: Date, end: Date)=>{
        const hours=Math.trunc((end-start)/(1000*3600));
        const minutes=(end-start)/(1000*60)%60;
        return (hours?hours:'0')+' ч. '+(minutes?minutes:'0')+' м.';
    };

    const showTime = (time: Date)=>
    {
        return (time.getHours() ? time.getHours() : '00')+':'+(time.getMinutes() ? time.getMinutes() : '00');
    };
    
    const date = chooseDay?'':dateTimeStart.getDate()+'/'+(dateTimeStart.getMonth()+1)+'/'+dateTimeStart.getFullYear();

    return (
        <div className={Style.meetingCard}>
            <div className={Style.columns}>
                <div>{name}</div>
                <div className={Style.secondLine}>{progectName}</div>
                <div>{date}</div>
            </div>

            <div className={Style.columns}>
                <div className={Style.rightSide}>
                    <div>
                        <div className={conflict?(Style.redStyle):(Style.emptyStyle)}>
                            {showTime(dateTimeStart)}
                        </div>
                    </div>
                    <div className={Style.secondLine}> {duration(dateTimeStart, dateTimeEnd)}</div>
                    <div>
                        <div className={conflict?(Style.redStyle):(Style.emptyStyle)}>
                            {showTime(dateTimeEnd)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MeetingCard;
