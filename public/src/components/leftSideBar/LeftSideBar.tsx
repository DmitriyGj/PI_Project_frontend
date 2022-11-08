import React from 'react';
import { useState } from 'react';
import 'antd/dist/antd.css';
import { DatePicker, Space } from 'antd';
import type { DatePickerProps, RangePickerProps } from 'antd/es/date-picker';
import { Radio } from 'antd';
import type { RadioChangeEvent } from 'antd';
import Style from './leftsidebar.module.scss';
import { LeftSideBarProps } from './types';

const { RangePicker } = DatePicker;

const LeftSideBar = ({ children }: LeftSideBarProps) => {
    const [ date1, setDate1 ] = useState(new Date());
    const [ date2, setDate2 ] = useState(new Date());

    const onChangeDate = (
        value: DatePickerProps['value'] | RangePickerProps['value'],
        dateString: [string, string] | string,
    ) => {
        console.log('Selected Time: ', value);
        console.log('Formatted Selected Time: ', dateString);
        setDate1(new Date(dateString[0]));
        setDate2(new Date(dateString[1]));
    };

    const [ group, setGroup ] = useState(1);

    const onChangeGroup = (e: RadioChangeEvent) => {
        console.log('radio checked', e.target.value);
        setGroup(e.target.value);
    };
    
    return (
        <div className={Style.comp}>
            <div className={Style.leftSideBar}>
                <Space direction='vertical' size={12}>
                    <label><b>Временной промежуток</b></label>
                    <RangePicker onChange={onChangeDate}/>
                    <label><b>Группировка</b></label>
                    <Radio.Group onChange={onChangeGroup} value={group}>
                        <Space direction='vertical'>
                            <Radio value={1}>По дням</Radio>
                            <Radio value={2}>По неделям</Radio>
                            <Radio value={3}>По месяцам</Radio>
                            <Radio value={4}>По годам</Radio>
                        </Space>
                    </Radio.Group>
                </Space>
            </div>
            <div className={Style.children}>
                {children}
            </div>
        </div>
    );
};

//import LeftSideBar from 'components/leftSideBar/LeftSideBar';

export default LeftSideBar;
