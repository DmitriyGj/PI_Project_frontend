import type { NextPage } from 'next';
import MeetingForm from '@components/meetingForm';
const Home: NextPage = () => {
    return (
        <div style={{ display:'flex', justifyContent:'center', width:'100%' }}>
            <h1>Hello World </h1>
            <MeetingForm/>
        </div>
    );
};

export default Home;
