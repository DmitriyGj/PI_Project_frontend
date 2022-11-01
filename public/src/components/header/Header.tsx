import Link from 'next/link';
import Style from './header.module.scss';
import { useSelector } from 'react-redux';

import SideBar from '@components/sideBar/SideBar';
import { getCurrentUserRole } from '@store/meetings/selectors';
import { UserRole } from '@store/users/types';

const Header = () => {
    const userStatus = useSelector(getCurrentUserRole);

    return (
        <header className={ Style.menu }>
            <div>logo</div>
            {userStatus == UserRole.ADMIN 
                ? <nav >
                    <SideBar width= { '200px' } />
                    <Link className= { Style.link } href={ '/' } >
                      Главная страница
                    </Link>
                    <Link href={ '/test' }>
                      Тестовая страница
                    </Link>
                </nav>
                : null 
            }
        </header>
    );
};

export default Header;
