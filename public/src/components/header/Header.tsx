import Link from "next/link";
import Style from "./header.module.scss";

import SideBar from "@components/sideBar/SideBar";

const Header = () => {
    return(
        <header>
          <nav className={Style.menu}>
          <SideBar width={"200px"}/>
            <Link className={Style.link} href={'/'}>
               Главная страница
            </Link>
            <Link href={'/test'}>
                Тестовая страница
            </Link>
          </nav>
        </header>
    );
}

export default Header;