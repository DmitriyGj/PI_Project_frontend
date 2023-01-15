import { Button, Modal, Input } from 'antd';
import React, { useState } from 'react';
import Style from './authorizationForm.module.scss';
import 'antd/dist/antd.css';
import { useDispatch } from 'react-redux';
import { authUser } from '@store/users/thunk';
import { useAppDispatch } from '@store/index';
import { setCurrentUser } from '@store/users/slice';
import { removeCookies } from 'cookies-next';


type UserBlockProps = {
    user?: User
}

type User = {
    id: number
    name: string
}

type AuthorizationFormState = {
    login: string
    password: string
}

///   ```
const AuthorizationForm = ({ user }: UserBlockProps) => {
    const [ isModalOpen, setIsModalOpen ] = useState(false);
    const [ authorizationFormState, setAuthorizationFormState ] = useState<AuthorizationFormState>({ login: '', password: '' });
    const dispatch = useAppDispatch();

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
        dispatch(authUser({ ...authorizationFormState }));
        // TODO: fetch        
    };

    const handleLogout = () => {
        dispatch(setCurrentUser(null));
        removeCookies('user');
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

            <Modal title='ВстречМен' open={isModalOpen} onOk={handleOk} onCancel={handleCancel} width={250}
                transitionName='' // костыль, убирающий кривую анимацию появления модалки
                footer={[
                    <Button key='submit' style={{ background: '#3D3BBC', borderColor: '#3D3BBC', color: 'white' }} onClick={handleOk}>
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
