import React from 'react';
import { useState } from 'react';
import { DatePicker, Radio } from 'antd';
import type { DatePickerProps, RangePickerProps } from 'antd/es/date-picker';
import type { RadioChangeEvent } from 'antd';
import 'moment/locale/ru';
import { ConfigProvider } from 'antd';
import ru_RU from 'antd/lib/locale/ru_RU';
import Style from './leftsidebar.module.scss';

const { RangePicker } = DatePicker;

const LeftSideBar = () => {
    const [ date1, setDate1 ] = useState('');
    const [ date2, setDate2 ] = useState('');
    const [ group, setGroup ] = useState(1);

    const onChangeDate = (
        value: DatePickerProps['value'] | RangePickerProps['value'],
        dateString: [string, string] | string,
    ) => {
        setDate1(dateString[0]);
        setDate2(dateString[1]);
    };

    const options = [
        { label: 'День', value: 1 },
        { label: 'Неделя', value: 2 },
        { label: 'Месяц', value: 3 }
    ];

    const onChangeGroup = (e: RadioChangeEvent) => {
        setGroup(e.target.value);
    };
    
    return (
        <div className={Style.leftSideBar}>
            <label><b>Промежуток дат</b></label>
            <ConfigProvider locale={ru_RU}>
                <RangePicker onChange={onChangeDate} placeholder={[ 'От', 'До' ]}/>
            </ConfigProvider>
            <Radio.Group options={options} onChange={onChangeGroup} value={group} 
                optionType='button' style={{ display:'flex', justifyContent:'center' }}/>
        </div>
    );
};

export default LeftSideBar;
