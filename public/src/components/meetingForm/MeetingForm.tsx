import { useDispatch, useSelector } from 'react-redux';
import { getUsers, getCurrentUser } from '@store/users/selectors';
import { setOpened } from '@store/sidebar/slice';
import { getEditedMeeting } from '@store/meetings/selectors';
import { setEditedMeeting } from '@store/meetings/slice';


import { Button, Modal, Input, Drawer, Space, DatePicker, TimePicker, Select, SelectProps, Checkbox, AutoComplete, DatePickerProps } from 'antd/lib';

import { useState } from 'react';
import Style from './meetingForm.module.scss';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import type {  RangePickerProps } from 'antd/es/date-picker';
import moment from 'moment';
import dayjs from 'dayjs';
import { SelectUsers } from '@components/selectUsers/SelectUsers';
// import { ISelectUsersProps, ISelectUsersState } from '@components/selectUsers';
// import { UserRole } from '@store/users/types';

const MeetingForm = () => {
    // добавить состояния для дат и передать их в value 
    const users = useSelector(getUsers);
    let editedMeeting = JSON.parse(JSON.stringify(useSelector(getEditedMeeting)));
    const currentUser = useSelector(getCurrentUser);

    let startEdited = moment(editedMeeting?.dateTimeStart);
    let endEdeted = moment(editedMeeting?.dateTimeEnd);

    let startDate = startEdited.clone().format('YYYY-MM-DD');
    let endDate = endEdeted.clone().format('YYYY-MM-DD');

    let startTime =startEdited.clone().format('HH:mm');
    let endTime = endEdeted.clone().format('HH:mm');

    const dateFormat = 'DD.MM.YY';
    const timeFormat = 'HH:mm';
    const datetimeFormat = 'DD.MM.YY | HH:mm';

    const dispatch = useDispatch();

    const onClose = () => {
        dispatch(setEditedMeeting({ id: -1, name:'', invoker: '', place:'', link:'', progectName:'', dateTimeStart: new Date(), dateTimeEnd: new Date(), participants : [] }));
        dispatch(setOpened(false));
    };

    const onCheckBox = (e: CheckboxChangeEvent) => {
        if(!e.target.checked){
            editedMeeting.dateTimeEnd = new Date(startDate + ' ' + endTime);
            dispatch(setEditedMeeting(editedMeeting));
        } else{
            editedMeeting.dateTimeEnd = new Date(startDate + ' ' + endTime).setDate(new Date(startDate + ' ' + endTime).getDate() + 1);
            dispatch(setEditedMeeting(editedMeeting));
        }
    };

    const onName = (e) => {
        editedMeeting.name = e.target.value;
        dispatch(setEditedMeeting(editedMeeting));
    };

    const onPlace = (e) => {
        editedMeeting.place = e.target.value;
        dispatch(setEditedMeeting(editedMeeting));
    };

    const onLink = (e) => {
        editedMeeting.link = e.target.value;
        dispatch(setEditedMeeting(editedMeeting));
    };

    const onDatePickerStart = (e) => {
        editedMeeting.dateTimeStart = new Date(e.clone().format('YYYY-MM-DD') + ' ' + startTime);
        dispatch(setEditedMeeting(editedMeeting));
    };

    const onTimePickerStart = (e) => {
        editedMeeting.dateTimeStart = new Date(startDate + ' ' + e.clone().format('HH:mm'));
        dispatch(setEditedMeeting(editedMeeting));
    };

    const onDatePickerEnd = (e) => {
        editedMeeting.dateTimeEnd = new Date(e.clone().format('YYYY-MM-DD HH:mm'));
        dispatch(setEditedMeeting(editedMeeting));
    };

    const onTimePickerEnd = (e) => {
        editedMeeting.dateTimeEnd = new Date(startDate + ' ' + e.clone().format('HH:mm'));
        dispatch(setEditedMeeting(editedMeeting));
    };

    const disabledDate: RangePickerProps['disabledDate'] = (date) => {
        return date < dayjs().startOf('day');
    };


    return (
        <>
            <div className={Style.main}>
                <h3>Название встречи</h3>
                <Input placeholder="Введите название встречи" value={editedMeeting.name} onChange={onName}/>
                
                <h3>Дата проведения</h3>
                <DatePicker value={moment(startEdited)} onChange={onDatePickerStart} placement="bottomRight" placeholder={'Выберите дату'} disabledDate={disabledDate} className={Style.width} format={dateFormat} />

                <h3>Время встречи</h3>
                <TimePicker value={moment(startEdited)} onChange={onTimePickerStart} placement="bottomRight" placeholder={'Время начала'} className={Style.width} format={timeFormat} />

                <Checkbox className={Style.margintop} checked={ startDate !== endDate } onChange={onCheckBox}>Иная дата окончания</Checkbox>
                {startDate !== endDate
                    ? <>
                        <DatePicker value={moment(endEdeted)} onChange={onDatePickerEnd} placement="bottomRight" showTime placeholder='Выберите дату окончания' format={datetimeFormat} className={Style.another} />
                    </>
                    : <TimePicker value={moment(endEdeted)} onChange={onTimePickerEnd} placement="bottomRight" placeholder={"Время окончания"} className={Style.another} format={timeFormat} />
                }
                
                <h3>Место проведения</h3>
                <Input addonBefore="http://" value={editedMeeting.place } onChange={onPlace}/> 
                <div className={Style.andor}>и/или</div>
                <Input placeholder="Локация" value={editedMeeting.link } onChange={onLink}/>

                <h3>Проекты</h3>
                <SelectUsers
                items={users}/>

                <h3>Организатор</h3>
                <div>{currentUser?.name}<br/><div className={Style.email}>{currentUser?.email}</div></div>
                
                <h3>Участники</h3>
                <SelectUsers
                items={users}/>

                <Space className={Style.item} align="center">
                    <Button onClick={onClose}>Сбросить</Button>
                    <Button onClick={onClose} type="primary">Сохранить</Button>
                </Space>
            </div>
        </>
    );
};

export default MeetingForm;