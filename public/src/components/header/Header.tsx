import style from './header.module.scss';
import { useSelector } from 'react-redux';


import SideBar from '@components/sideBar/SideBar';
import NavigationMenu from '@components/navigationMenu/NavigationMenu';

import { LinkProps } from '../navigationMenu/types';

// import {  } from '@store/meetings/selectors';
import { getCurrentUser, getCurrentUserRole } from '@store/users/selectors';

import { UserRole } from '@store/users/types';

import Logo from '@components/logo/Logo';

import AuthorizationForm from '@components/authorizationForm/AuthorizationForm';

import { Button } from 'antd';


const Header = () => {
    const userStatus = useSelector(getCurrentUserRole);
    const currentUser = useSelector(getCurrentUser);

    const linksInfo: LinkProps[] = [
        {
            id: 1,
            href: '/',
            label: 'Главная страница'
        },
        {
            id: 2,
            href: '/test',
            label: 'Тестовая страница'

        },
        {
            id: 3,
            href: '/meetings',
            label: 'Встречи'

        }
    ];

    return (
        <header className={ style.header }>
            <Logo width={'200px'} height={'100%'}/>
            <div className={style.headerCols}>
                <div>
                    {userStatus == UserRole.ADMIN ? (
                        <NavigationMenu linksInfo={linksInfo} />
                    ) : null}
                </div>
                <div>
                    {currentUser? 
                        <Button style={{ background: '#3D3BBC', borderColor: '#3D3BBC', color: 'white' }}>Выход</Button>
                        : 
                        // <Button className={style.btnmain}>Выход</Button>
                        <div className={style.header__rightSubmenu}>
                            <AuthorizationForm user={undefined} />
                        </div>
                    }
                </div>
            </div>
            

        </header>
    );
};

export default Header;
