import Link from "next/link";
import Style from "./header.module.scss";

import SideBar from "@components/sideBar/SideBar";

const Header = () => {
    return(
        <>
          <nav className={Style.menu}>
          <SideBar/>
            <Link href={'/'}>
                <a className={Style.link}>Главная страница</a>
            </Link>
            <Link href={'/test'}>
                <a>Тестовая страница</a>
            </Link>
          </nav>
        </>
    );
}

export default Header;