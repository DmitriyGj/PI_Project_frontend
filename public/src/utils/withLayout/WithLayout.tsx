import Style from './withLayout.module.scss';

import Header from '@components/header/Header';
import Footer from '@components/footer/Footer';
import Loader from '@components/loader/Loader';

import { AppStatus } from '../../store/app/types';


import { useSelector } from 'react-redux';


const WithLoyout = ({ children }) => {
    const appStatus = useSelector(state => state.appSlice.status);

    return(
        <div className={Style.container}>
            <Header/>
            <main>
                {appStatus==AppStatus.loading? <Loader/> : null}
                {children}
            </main>

            <Footer/>
        </div>
    );
};

export default WithLoyout;
