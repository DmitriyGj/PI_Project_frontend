import Style from './header.module.scss';
import { useSelector } from 'react-redux';
<<<<<<< HEAD

import SideBar from '@components/sideBar/SideBar';
import NavigationMenu from '@components/navigationMenu/NavigationMenu';
=======

import SideBar from '@components/sideBar/SideBar';
import NavigationMenu from '@components/navigationMenu/NavigationMenu';

import { LinkProps } from '../navigationMenu/types';

import { getCurrentUserRole } from '@store/meetings/selectors';
import { UserRole } from '@store/users/types';

import Logo from '@components/logo/Logo';

import AuthorizationForm from '@components/authorizationForm/AuthorizationForm';

>>>>>>> develop

import { LinkProps } from '../navigationMenu/types';

import { getCurrentUserRole } from '@store/meetings/selectors';
import { UserRole } from '@store/users/types';

import Logo from '@components/logo/Logo';
const Header = () => {
    const userStatus = useSelector(getCurrentUserRole);

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
<<<<<<< HEAD
        },
        {
            id: 3,
            href: '/meetings',
            label: 'Встречи'
=======
>>>>>>> develop
        }
    ];

    return (
        <header className={ Style.header }>
            <Logo width={'200px'} height={'100%'}/>
            {userStatus == UserRole.ADMIN 
                ? <>
                    <NavigationMenu linksInfo={linksInfo}/>  
                </>
                : null 
            }
<<<<<<< HEAD
            <SideBar width= { '200px' } />
=======
            <div className={Style.header__rightSubmenu}>
                <AuthorizationForm user={undefined} />
                <SideBar width={'200px'} />
            </div>
>>>>>>> develop
        </header>
    );
};

export default Header;
