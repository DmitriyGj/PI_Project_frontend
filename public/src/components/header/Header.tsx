import Link from "next/link";
import Style from "./header.module.scss";
import { useSelector } from "react-redux";

import SideBar from "@components/sideBar/SideBar";

const Header = () => {
  const userStatus = useSelector(state => state.userSlice.currentUser?.role);

  return (
    <header className={Style.menu}>
      <div>logo</div>
      {userStatus == "admin" ?
        <nav >
          <SideBar width={"200px"} />
          <Link className={Style.link} href={'/'}>
            Главная страница
          </Link>
          <Link href={'/test'}>
            Тестовая страница
          </Link>
        </nav>
        : null}
    </header>
  );
}

export default Header;