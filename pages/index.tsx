
import MeetingSchedule from '@components/meetingSchedule/MeetingSchedule';
import { wrapper } from '@store/index';
import { getCurrentUser } from '@store/users/selectors';
import { setCurrentUser } from '@store/users/slice';
import type { NextPage, GetServerSideProps, GetServerSidePropsResult } from 'next';
import { getCookie } from 'cookies-next';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMeetings } from '@store/meetings/thunk';
import { fetchUsers } from '@store/users/thunk';

const Home: NextPage = () => {
    const dispatch = useDispatch();
    const currentUser = useSelector(getCurrentUser);

    useEffect(() => {
        const userString = getCookie('user');
        (async() => {
            const user = await JSON.parse(userString);
            dispatch(setCurrentUser(user));
        })();
    }, []);

    useEffect(() => {
        dispatch(fetchMeetings(null));
        dispatch(fetchUsers(null));
    },[ currentUser ]);

    return (
        <>
            <MeetingSchedule/>
        </>
    );
};

export default Home;
