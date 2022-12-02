import { Button, Modal, Input, Drawer, Space, DatePicker, TimePicker, Select, SelectProps, Checkbox, AutoComplete, DatePickerProps } from 'antd/lib';
import 'antd/dist/antd.css';
import React, { useState } from 'react';
import Style from './meetingForm.module.scss';
import { getUsers, getCurrentUser } from '@store/users/selectors';
import { useSelector } from 'react-redux';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import type {  RangePickerProps } from 'antd/es/date-picker';
import dayjs from 'dayjs';
import { SelectUsers } from '@components/select_users/select_users';
import { ISelectUsersProps, ISelectUsersState } from '@components/select_users';
import { UserRole } from '@store/users/types';

const MeetingForm = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [checked, setChecked] = useState(false);

    const [changeDate, setchangeDate] = useState();

    const onChange = (e: CheckboxChangeEvent) => {

        setChecked(e.target.checked);
    };

    const Show = () => {
        setIsModalOpen(true);
    };

    const Close = () => {
        setIsModalOpen(false);
    };

    const dateFormat = 'DD.MM.YY';

    const timeFormat = 'HH:mm';

    const datetimeFormat = 'DD.MM.YY | HH:mm';

    const users = useSelector(getUsers);

    const disabledDate: RangePickerProps['disabledDate'] = (current) => {
        // Can not select days before today and today
        return current && current < dayjs().endOf('day');
    };

    const currentUser = useSelector(getCurrentUser);

    return (
        <>
            <Button type="primary" onClick={Show}>
                +
            </Button>
            <Drawer title="Новая встреча" placement='right' open={isModalOpen} onClose={Close} >
                <div className={Style.main}>

                    <h3>Название встречи</h3>
                    <Input placeholder="Введите название встречи" />

                    <h3>Место проведения</h3>
                    <Input placeholder="Введите место проведения встречи" />

                    <h3>Дата проведения</h3>
                    <DatePicker placement="bottomRight" placeholder='Выберите дату' disabledDate={disabledDate} className={Style.width} format={dateFormat} />

                    <h3>Время встречи</h3>
                    <TimePicker placement="bottomRight" placeholder={"Время начала"} className={Style.width} format={timeFormat} />

                    <Checkbox className={Style.margintop} checked={checked} onChange={onChange}>Иная дата окончания</Checkbox>
                    {checked
                        ? <>
                            <DatePicker placement="bottomRight" showTime placeholder='Выберите дату окончания'  format={datetimeFormat} className={Style.another} />
                        </>
                        : <TimePicker placement="bottomRight" placeholder={"Время окончания"} className={Style.another} format={timeFormat} />
                    }
                    
                    <h3>Место проведения</h3>
                    <Input addonBefore="http://"/>
                    <div className={Style.andor}>и/или</div>
                    <Input placeholder="Локация" />

                    <h3>Проекты</h3>
                    <SelectUsers
                    items={users}/>

                    <h3>Организатор</h3>
                    <p>{currentUser?.name}<br/><div className={Style.email}>{currentUser?.email}</div></p>
                    
                    <h3>Участники</h3>
                    <SelectUsers
                    items={users}/>

                    <Space className={Style.item} align="center">
                        <Button onClick={Close}>Сбросить</Button>
                        <Button onClick={Close} type="primary">Сохранить</Button>
                    </Space>
                </div>
            </Drawer>
        </>
    );
};

export default MeetingForm;