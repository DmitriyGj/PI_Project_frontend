import { SelectUsers } from '@components/select_users/select_users';
import { UserDetailInfo, UserRole } from '@store/users/types';
import type { NextPage } from 'next';

const Home = ({ items }: { items: UserDetailInfo[]}) => {
    return (
        <div style={{ display:'flex', justifyContent:'center', width:'100%' }}>
            <h1>Hello World </h1>
            <SelectUsers items={items}  />
        </div>
    );
};

export async function getServerSideProps() {
    return {
        props: {
            items: [
                {
                    id:2,
                    name: 'Boris',
                    email: 'Elcin@mail.ru',
                    login: '',
                    organization:'',
                    role: UserRole.NONE
                },
                {
                    id:3,
                    name: 'Anton',
                    email: 'Anton@mail.ru',
                    login: '',
                    organization:'',
                    role: UserRole.NONE
                },
                {
                    id:5,
                    name: 'Ivan',
                    email: 'Ivan@mail.ru',
                    login: '',
                    organization:'',
                    role: UserRole.NONE
                }
            ] as UserDetailInfo []
        }, // will be passed to the page component as props
    };
}

export default Home;
