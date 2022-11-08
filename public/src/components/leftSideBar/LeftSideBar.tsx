import React from 'react';
import { useState } from 'react';
import 'antd/dist/antd.css';
import { DatePicker, Space, Radio } from 'antd';
import type { DatePickerProps, RangePickerProps } from 'antd/es/date-picker';
import type { RadioChangeEvent } from 'antd';
import Style from './leftsidebar.module.scss';
import { LeftSideBarProps } from './types';

import 'moment/locale/ru';
import { ConfigProvider } from 'antd';
import ru_RU from 'antd/lib/locale/ru_RU';

const { RangePicker } = DatePicker;

const LeftSideBar = ({ children }: LeftSideBarProps) => {
    const [ date1, setDate1 ] = useState('');
    const [ date2, setDate2 ] = useState('');

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

    const [ group, setGroup ] = useState(1);

    const onChangeGroup = (e: RadioChangeEvent) => {
        setGroup(e.target.value);
    };
    
    return (
        <div className={Style.comp}>
            <div className={Style.leftSideBar}>
                <Space direction='vertical' size={12}>
                    <label><b>Промежуток дат</b></label>
                    <ConfigProvider locale={ru_RU}>
                        <RangePicker onChange={onChangeDate} placeholder={[ 'От', 'До' ]}/>
                    </ConfigProvider>
                    <Radio.Group options={options} onChange={onChangeGroup} value={group} optionType='button' style={{ display:'flex', justifyContent:'center' }}/>
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
