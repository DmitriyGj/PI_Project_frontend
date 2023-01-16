import { useDispatch } from 'react-redux';
import Style from './userForm.module.scss';
import { setOpened } from '@store/sidebar/slice';

import { Button, Input, Space } from 'antd/lib';

const UserForm=()=>{

    const dispatch = useDispatch();

    const onClose = () => {
        dispatch(setOpened(false));
    };

    return (
        <>
            <div className={Style.main}>
                <h3>Имя</h3>
                <Input placeholder="Введите имя"/>

                <h3>Фамилия</h3>
                <Input placeholder="Введите фамилию" />

                <h3>Отчество</h3>
                <Input placeholder="Введите отчество"/>
                
                <h3>Логин</h3>
                <Input placeholder="Введите логин" />
                
                <h3>Email</h3>
                <Input placeholder="Введите Email" type="email" />

                <Space className={Style.item} align="center">
                    <Button onClick={onClose}>Сбросить</Button>
                    <Button onClick={onClose} type="primary">Добавить</Button>
                </Space>
            </div>
        </>
    );
};

export default UserForm;
