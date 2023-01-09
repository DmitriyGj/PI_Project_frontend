import { Button, Modal, Input } from 'antd';
import React, { useState } from 'react';
import Style from './authorizationForm.module.scss';
import 'antd/dist/antd.css';


type UserBlockProps = {
    user?: User
}

type User = {
    id: number,
    name: string
}

type AuthorizationFormState = {
    login: string,
    password: string
}


/// Блок, который отображает либо кнопку вход для последующего ввода логина-пароля в модалке,
/// либо имя-фамилию и кнопку выход.
///
/// Примеры использования:
///
///   ```
///   <AuthorizationForm user={undefined} />
///   ```
///
///   ```
///   <AuthorizationForm user={{ id: 1, name: 'Петр Петров' }} />
///   ```
const AuthorizationForm = ({ user }: UserBlockProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [authorizationFormState, setAuthorizationFormState] = useState({ login: '', password: '' });

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        handleLogin();
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        handleLogout();
        setIsModalOpen(false);
    };

    const handleLogin = () => {
        // TODO: fetch        
    };

    const handleLogout = () => {
        // TODO: fetch
    };

    const changeState = (e: any) => {
        const { value, name } = e.target;

        setAuthorizationFormState({
            ...authorizationFormState,
            [name]: value
        });
    };

    return (
        <>
            {user != undefined
                ?
                <div className={Style.authorizationForm__userBlock}>
                    {user.name}
                    <Button style={{ background: '#3D3BBC', borderColor: '#3D3BBC', color: 'white' }} onClick={handleLogout}>
                        Выход
                    </Button>
                </div>
                :
                <Button style={{ background: '#3D3BBC', borderColor: '#3D3BBC', color: 'white' }} onClick={showModal}>
                    Вход
                </Button>
            }

            <Modal title="ВстречМен" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} width={250}
                transitionName="" // костыль, убирающий кривую анимацию появления модалки
                footer={[
                    <Button key="submit" style={{ background: '#3D3BBC', borderColor: '#3D3BBC', color: 'white' }} onClick={handleOk}>
                        Вход
                    </Button>
                ]}
            >
                <div className={Style.authorizationForm__content}>
                    <Input placeholder='Логин' name='login' onChange={changeState} />
                    <Input placeholder='Пароль' type='password' name='password' onChange={changeState} />
                </div>
            </Modal>
        </>
    );
};

export default AuthorizationForm;
