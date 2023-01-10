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
    const editedMeeting = useSelector(getEditedMeeting);
    const currentUser = useSelector(getCurrentUser);

    const [ dateTimeStart, setDateTimeStart ] = useState();
    const [ dateTimeEnd, setDateTimeEnd ] = useState();
    const [ checked, setChecked ] = useState(false);

    const dispatch = useDispatch();

    const onClose = () => {
        dispatch(setEditedMeeting(null));
        dispatch(setOpened(false));
        setChecked(false);
    };

    const onChange = (e: CheckboxChangeEvent) => {
        setChecked(e.target.checked);
    };

    const dateFormat = 'DD.MM.YY';
    const timeFormat = 'HH:mm';
    const datetimeFormat = 'DD.MM.YY | HH:mm';

    let startDateTime = moment(editedMeeting?.dateTimeStart);
    let endDateTime = moment(editedMeeting?.dateTimeEnd);

    let startDate =startDateTime.clone().format('DD.MM.YY');
    let endDate =endDateTime.clone().format('DD.MM.YY');


    const disabledDate: RangePickerProps['disabledDate'] = (current) => {
        // Can not select days before today and today
        return current && current < dayjs().endOf('day');
    };


    return (
        <>
            <div className={Style.main}>
                <h3>Название встречи</h3>
                <Input placeholder="Введите название встречи" value={editedMeeting? editedMeeting.name : ''}/>

                {/* <h3>Место проведения</h3>
                <Input placeholder="Введите место проведения встречи" value={editedMeeting? editedMeeting.place : ''}/> */}

                <h3>Дата проведения</h3>
                <DatePicker value={editedMeeting? dayjs(startDateTime, dateFormat) : ''} placement="bottomRight" placeholder={'Выберите дату'} disabledDate={disabledDate} className={Style.width} format={dateFormat} />

                <h3>Время встречи</h3>
                <TimePicker value={editedMeeting? dayjs(startDateTime, timeFormat) : ''} placement="bottomRight" placeholder={'Время начала'} className={Style.width} format={timeFormat} />

                <Checkbox className={Style.margintop} checked={ editedMeeting? checked || startDate !== endDate : checked } onChange={onChange}>Иная дата окончания</Checkbox>
                {checked || startDate !== endDate
                    ? <>
                        <DatePicker value={editedMeeting? dayjs(endDateTime, datetimeFormat) : ''} placement="bottomRight" showTime placeholder='Выберите дату окончания'  format={datetimeFormat} className={Style.another} />
                    </>
                    : <TimePicker value={editedMeeting? dayjs(endDateTime, timeFormat) : ''} placement="bottomRight" placeholder={"Время окончания"} className={Style.another} format={timeFormat} />
                }
                
                {/* не хватает интернет адреса */}
                <h3>Место проведения</h3>
                <Input addonBefore="http://" value={editedMeeting? editedMeeting.place : ''}/> 
                <div className={Style.andor}>и/или</div>
                <Input placeholder="Локация" value={editedMeeting? editedMeeting.place : ''}/>

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