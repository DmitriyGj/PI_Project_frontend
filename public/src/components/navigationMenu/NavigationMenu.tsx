import Link from 'next/link';
import Style from './navigationMenu.module.scss';
import { NavigationMenuProps } from './types';

const NavigationMenu = ({ linksInfo }: NavigationMenuProps ) => {
    return (
        <nav className={Style.links}>
            { linksInfo.map(linkInfo =>
                <Link href={linkInfo.href} key={linkInfo.id}>
                    <label className={Style.link}>{linkInfo.label}</label>
                </Link>)}
        </nav>
    );
};

export default NavigationMenu;
