import React from 'react';
import { useState } from 'react';
import { DatePicker, Radio } from 'antd';
// import type { DatePickerProps, RangePickerProps } from 'antd/es/date-picker';
import type { RangePickerSharedProps } from 'rc-picker/lib/RangePicker';
import type { RadioChangeEvent } from 'antd';
import Style from './leftsidebar.module.scss';
import type { Moment } from 'moment';

import type { RootState } from '@store/index';
import { MeetingDateInterval, CalendarViewType } from '../../store/meetings/types';
import { useDispatch, useSelector } from 'react-redux';
import { setInterval, setViewType } from '@store/meetings/slice';


const { RangePicker } = DatePicker;


const LeftSideBar = () => {
    const dispatch = useDispatch();
    const viewType = useSelector((state:RootState) => state.meetingsSlice.viewType); 
    
    const onChangeDate = (values: RangePickerSharedProps<Moment>['value']) => {
        console.log(values);
        let startDate: Date | null;
        let endDate: Date | null;
        if(values){
            if(values[0]) {
                startDate = new Date(values[0]?.format('YYYY-MM-DD'));
            } 
            else {
                startDate = null;
            }
            if(values[1]) {
                endDate = new Date(values[1]?.format('YYYY-MM-DD'));
            } 
            else {
                endDate = null;
            }
        } 
        else {
            startDate = null;
            endDate = null;
        }


        const interval: MeetingDateInterval = {
            start: startDate,
            end: endDate
        };
        dispatch(setInterval(interval));
    };

    const options = [
        { label: 'День', value: CalendarViewType.day },
        { label: 'Неделя', value: CalendarViewType.week },
        { label: 'Месяц', value: CalendarViewType.month }
    ];

    const onChangeGroup = (e: RadioChangeEvent) => {
        dispatch(setViewType(e.target.value));
    };
    
    return (
        <div className={Style.leftSideBar}>
            <label><b>Промежуток дат</b></label>
            <RangePicker allowEmpty={[ true, true ]} onChange={onChangeDate} placeholder={[ 'От', 'До' ]}/>
            <Radio.Group options={options} onChange={onChangeGroup} value={viewType} 
                optionType='button' style={{ display:'flex', justifyContent:'center' }}/>
        </div>
    );
};

export default LeftSideBar;
