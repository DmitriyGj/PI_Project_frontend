import Style from './header.module.scss';
import { useSelector } from 'react-redux';

import SideBar from '@components/sideBar/SideBar';
import NavigationMenu from '@components/navigationMenu/NavigationMenu';

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
        },
        {
            id: 3,
            href: '/meetings',
            label: 'Встречи'
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
            <SideBar width= { '200px' } />
        </header>
    );
};

export default Header;
