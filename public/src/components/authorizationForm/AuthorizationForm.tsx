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

    return (
        <>
            {user != undefined
                ?
                <div className={Style.authorizationForm__userBlock}>
                    {user.name}
                    <Button type="primary" onClick={handleLogout}>
                        Выход
                    </Button>
                </div>
                :
                <Button type="primary" onClick={showModal}>
                    Вход
                </Button>
            }

            <Modal title="ВстречМен" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} width={250}
                transitionName="" // костыль, убирающий кривую анимацию появления модалки
                footer={[
                    <Button key="submit" type="primary" onClick={handleOk}>
                        Вход
                    </Button>
                ]}
            >
                <div className={Style.authorizationForm__content}>
                    <Input placeholder='Логин' />
                    <Input placeholder='Пароль' type='password' />
                </div>
            </Modal>
        </>
    );
};

export default AuthorizationForm;
