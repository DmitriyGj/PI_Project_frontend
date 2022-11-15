import { Button, Modal, Input, Drawer, Space, DatePicker, TimePicker, Select, SelectProps} from 'antd/lib';
import 'antd/dist/antd.css';
import React, { useState } from 'react';
import Style from './meetingForm.module.scss';
import { getUsers } from '@store/users/selectors';
import { useSelector } from 'react-redux';
const MeetingForm = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const Show = () => {
        setIsModalOpen(true);
    };

    const Close = () => {
        setIsModalOpen(false);
    };

    const dateFormat = 'DD.MM.YY';

    const timeFormat = 'HH:mm';

    const users = useSelector(getUsers);
    
    const users2: SelectProps['options']=[];
    
    users.forEach(element => {
        users2.push({
            value:element.name+"*"+element.email,
            label:element.name});
    });
    return (
        <>
            <Button type="primary" onClick={Show}>
                +
            </Button>
            <Drawer title="Новая встреча" placement='right' open={isModalOpen} onClose={Close} >
                
                <h3>Название встречи</h3>
                <Input placeholder="Введите название встречи" />
                <h3>Место проведения</h3>
                <Input placeholder="Введите место проведения встречи" />
                <h3>Дата проведения</h3>
                <DatePicker placement="bottomRight" placeholder='Выберите дату' className={Style.width} format={dateFormat}/>
                <h3>Время проведения</h3>
                <TimePicker.RangePicker placeholder={["Начало","Конец"]} className={Style.width} format={timeFormat}/>
                <h3>Проекты</h3>
                <p><Select className={Style.width}/></p>
                <h3>Участники</h3>
                <p><Select options={users2} className={Style.width}/></p>
                <Space className={Style.space} align="center">
                    <Button onClick={Close}>Сбросить</Button>
                    <Button onClick={Close} type="primary">Сохранить</Button>
                </Space>
            </Drawer>
        </>
    );
};

export default MeetingForm;