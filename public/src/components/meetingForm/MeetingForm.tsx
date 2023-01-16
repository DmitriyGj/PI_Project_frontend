import { useDispatch, useSelector } from 'react-redux';
import { getUsers, getCurrentUser } from '@store/users/selectors';
import { setOpened } from '@store/sidebar/slice';
import { getEditedMeeting } from '@store/meetings/selectors';
import { setEditedMeeting } from '@store/meetings/slice';
import { addMeeting, removeMeeting, updateMeeting } from '@store/meetings/thunk';

import { Button, Modal, Input, Drawer, Space, DatePicker, TimePicker, Select, SelectProps, Checkbox, AutoComplete, DatePickerProps } from 'antd/lib';

import { useState } from 'react';
import Style from './meetingForm.module.scss';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import type {  RangePickerProps } from 'antd/es/date-picker';
import moment from 'moment';
import dayjs from 'dayjs';
import { SelectUsers } from '@components/selectUsers/SelectUsers';
import { MeetingsAPI } from 'fetch-api/meeting-api';


const MeetingForm = () => {
    // добавить состояния для дат и передать их в value 
    const users = useSelector(getUsers);
    const editedMeeting = useSelector(getEditedMeeting)!;
    const currentUser = useSelector(getCurrentUser);

    const startEdited = moment(editedMeeting?.dateTimeStart);
    const endEdeted = moment(editedMeeting?.dateTimeEnd);

    const startDate = startEdited.clone().format('YYYY-MM-DD');
    const endDate = endEdeted.clone().format('YYYY-MM-DD');

    const startTime =startEdited.clone().format('HH:mm');
    const endTime = endEdeted.clone().format('HH:mm');

    const dateFormat = 'DD.MM.YY';
    const timeFormat = 'HH:mm';
    const datetimeFormat = 'DD.MM.YY | HH:mm';

    const organizator = editedMeeting.id === -1 ? currentUser : users.find(user => user.user_id === +editedMeeting.invoker)  ;
    const isNewMeeting = editedMeeting.id === -1;
    const isOrganizator = organizator?.login === currentUser?.login ;
    const canEdit = organizator?.login === currentUser?.login || !isNewMeeting;

    const dispatch = useDispatch();

    const onClose = () => {
        dispatch(setEditedMeeting({ id: -1, name:'', invoker:'' , place:'', link:'', progectName:'', dateTimeStart: new Date(), dateTimeEnd: new Date(), participants : [] }));
        dispatch(setOpened(false));
    };

    const onCheckBox = (e: CheckboxChangeEvent) => {
        if(!e.target.checked){
            dispatch(setEditedMeeting({ ...editedMeeting, dateTimeEnd: new Date(startDate + ' ' + endTime) }));
        } else{
            dispatch(setEditedMeeting({ ...editedMeeting, dateTimeEnd: new Date(startDate + ' ' + endTime).setDate(new Date(startDate + ' ' + endTime).getDate() + 1) }));
        }
    };

    const onName = (e) => {
        dispatch(setEditedMeeting({ ...editedMeeting, name: e.target.value }));
    };

    const onPlace = (e) => {
        dispatch(setEditedMeeting({ ...editedMeeting, place: e.target.value }));
    };

    const onLink = (e) => {
        dispatch(setEditedMeeting({ ...editedMeeting, link: e.target.value }));
    };

    const onDatePickerStart = (e) => {
        dispatch(setEditedMeeting({ ...editedMeeting, dateTimeStart:new Date(e.clone().format('YYYY-MM-DD') + ' ' + startTime) }));
    };

    const onTimePickerStart = (e) => {
        dispatch(setEditedMeeting({ ...editedMeeting, dateTimeStart: new Date(startDate + ' ' + e.clone().format('HH:mm')) }));
    };

    const onDatePickerEnd = (e) => {
        dispatch(setEditedMeeting({ ...editedMeeting, dateTimeEnd:new Date(e.clone().format('YYYY-MM-DD HH:mm')) }));
    };

    const onTimePickerEnd = (e) => {
        dispatch(setEditedMeeting({ ...editedMeeting, dateTimeEnd: new Date(startDate + ' ' + e.clone().format('HH:mm')) }));
    };

    const onParticipant = (value: string [] | undefined) => {
        dispatch(setEditedMeeting({ ...editedMeeting, participants: value ?? [] }));
    };

    const disabledDate: RangePickerProps['disabledDate'] = (date) => {
        return date < dayjs().startOf('day');
    };

    const handleSubmit = async() => {
        const method = editedMeeting.id !== -1 ? updateMeeting : addMeeting ;
        const requestData = editedMeeting.id !== -1 ? { ...editedMeeting } : { ...editedMeeting, invoker: currentUser?.id };
        const res =  dispatch(method(requestData));
    };

    return (
        editedMeeting && <>
            <div className={Style.main}>
                <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                    <h3>Название встречи</h3>
                    {isOrganizator && !isNewMeeting && <Button style={{ padding: 0, border: '0px'}} onClick={() =>{ onClose();dispatch(removeMeeting(editedMeeting.id)); }} >Удалить</Button>}
                </div>
                <Input disabled={!canEdit} placeholder='Введите название встречи' value={editedMeeting.name} onChange={onName}/>
                
                <h3>Дата проведения</h3>
                <DatePicker disabled={!canEdit} value={moment(startEdited)} onChange={onDatePickerStart} placement='bottomRight' placeholder={'Выберите дату'} disabledDate={disabledDate} className={Style.width} format={dateFormat} />

                <h3>Время встречи</h3>
                <TimePicker disabled={!canEdit} value={moment(startEdited)} onChange={onTimePickerStart} placement='bottomRight' placeholder={'Время начала'} className={Style.width} format={timeFormat} />

                <Checkbox disabled={!canEdit} className={Style.margintop} checked={ startDate !== endDate } onChange={onCheckBox}>Иная дата окончания</Checkbox>
                {startDate !== endDate
                    ? <>
                        <DatePicker disabled={!canEdit} value={moment(endEdeted)} onChange={onDatePickerEnd} placement='bottomRight' showTime placeholder='Выберите дату окончания' format={datetimeFormat} className={Style.another} />
                    </>
                    : <TimePicker disabled={!canEdit} value={moment(endEdeted)} onChange={onTimePickerEnd} placement='bottomRight' placeholder={'Время окончания'} className={Style.another} format={timeFormat} />
                }
                
                <h3>Место проведения</h3>
                <Input disabled={!canEdit} addonBefore='http://' value={editedMeeting.place } onChange={onPlace}/> 
                <div className={Style.andor}>и/или</div>
                <Input disabled={!canEdit} placeholder='Локация' value={editedMeeting.link } onChange={onLink}/>

                {/* <h3>Проект</h3>
                <SelectUsers
                    items={users}/> */}

                <h3>Организатор</h3>
                <div>{organizator?.name} {organizator?.lastName}<br/><div className={Style.email}>{organizator?.email}</div></div>
                
                <h3>Участники</h3>
                <SelectUsers
                    disabled={!canEdit}
                    selectedValue={editedMeeting.participants}
                    onSelect={onParticipant}
                    items={users}/>

                <Space className={Style.item} align='center'>
                    <Button onClick={onClose}>Сбросить</Button>
                    <Button onClick={() => {handleSubmit(); onClose();}} type='primary'>Сохранить</Button>
                </Space>
            </div>
        </>
    );
};

export default MeetingForm;
