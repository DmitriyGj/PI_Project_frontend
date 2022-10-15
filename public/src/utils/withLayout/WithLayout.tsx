// import SideBar from "@components/sideBar/SideBar";
// import Head from "next/head";

import Header from "@components/header/Header";
import Footer from "@components/footer/Footer";

const WithLoyout = ({children}) => {
    return(
       <>
        <Header/>
        <main>
            {children}
        </main>

        <Footer/>
       </>
    );
}

export default WithLoyout;