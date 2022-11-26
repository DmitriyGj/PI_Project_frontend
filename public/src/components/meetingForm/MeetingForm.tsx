import { Button, Modal, Input, Drawer, Space, DatePicker, TimePicker, Select, SelectProps, Checkbox, AutoComplete } from 'antd/lib';
import 'antd/dist/antd.css';
import React, { useState } from 'react';
import Style from './meetingForm.module.scss';
import { getUsers, getCurrentUser } from '@store/users/selectors';
import { useSelector } from 'react-redux';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
const MeetingForm = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [checked, setChecked] = useState(false);


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

    const users = useSelector(getUsers);

    const currentUser = useSelector(getCurrentUser);

    const users2: SelectProps['options'] = [];

    users.forEach(element => {
        users2.push({
            value: element.name + "*" + element.email,
            label: element.name + " • " + element.email
        });
    });
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
                    <DatePicker placement="bottomRight" placeholder='Выберите дату' className={Style.width} format={dateFormat} />
                    <h3>Время встречи</h3>
                    <TimePicker placement="bottomRight" placeholder={"Время начала"} className={Style.width} format={timeFormat} />
                    <Checkbox className={Style.margintop} checked={checked} onChange={onChange}>Иная дата окончания</Checkbox>
                    {checked
                        ? <>
                            <DatePicker placement="bottomRight" placeholder='Выберите дату окончания' className={Style.width} format={dateFormat} />

                            <TimePicker placement="bottomRight" placeholder={"Время окончания"} className={Style.another} format={timeFormat} />
                        </>
                        : null
                    }

                    <h3>Проекты</h3>
                    <p><AutoComplete
                        options={users2}
                        className={Style.width}
                        filterOption={(inputValue, option) =>
                            option!.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                        }
                    /></p>
                    <h3>Организатор</h3>
                    <p>{currentUser?.name}<br/><div className={Style.email}>{currentUser?.email}</div></p>
                    
                    <h3>Участники</h3>
                    <p><AutoComplete
                        options={users2}
                        className={Style.width}
                        filterOption={(inputValue, option) =>
                            option!.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                        }
                    /></p>
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