import type { NextPage } from 'next';
import LeftSideBar from 'components/leftSideBar/LeftSideBar';

const Home: NextPage = () => {
    return (
        <LeftSideBar>
        <div style={{ display:'flex', justifyContent:'center' }}>
            <h1>Hello World </h1> 
        </div>
        </LeftSideBar>
    );
};

export default Home;
