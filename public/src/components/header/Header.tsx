import Link from "next/link";
import Style from "./header.module.scss";

import SideBar from "@components/sideBar/SideBar";

const Header = () => {
    return(
        <header>
          <nav className={Style.menu}>
          <SideBar width={"200px"}/>
            <Link href={'/'}>
                <a className={Style.link}>Главная страница</a>
            </Link>
            <Link href={'/test'}>
                <a>Тестовая страница</a>
            </Link>
          </nav>
        </header>
    );
}

export default Header;