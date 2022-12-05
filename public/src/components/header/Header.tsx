import Style from './header.module.scss';
import { useSelector } from 'react-redux';
import { UserRole } from '@store/users/types';
import { getCurrentUserRole, getCurrentUser } from '@store/users/selectors';
import { Button } from 'antd';

import { LinkProps } from '@components/navigationMenu/types';

import NavigationMenu from '@components/navigationMenu/NavigationMenu';
import Logo from '@components/logo/Logo';

const Header = () => {
    const userStatus = useSelector(getCurrentUserRole);
    const currentUser = useSelector(getCurrentUser);

    const linksInfo: LinkProps[] = [
        {
            id: 1,
            href: '/',
            label: 'Главная страница',
        },
        {
            id: 2,
            href: '/test',
            label: 'Тестовая страница',
        }
    ];

    return (
        <header className={Style.header}>
            <Logo width={'200px'} height={'100%'} />
            <div className={Style.headerCols}>
                <div>
                    {userStatus == UserRole.ADMIN ? (
                        <NavigationMenu linksInfo={linksInfo} />
                    ) : null}
                </div>
                <div>
                    {currentUser? 
                        <Button style={{ background: '#3D3BBC', borderColor: '#3D3BBC', color: 'white' }}>Выход</Button>
                        : 
                        <Button style={{ background: '#3D3BBC', borderColor: '#3D3BBC', color: 'white' }}>Вход</Button>
                    }
                </div>
            </div>
        </header>
    );
};

export default Header;
