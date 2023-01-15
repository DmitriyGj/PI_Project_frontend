import { baseURL } from './config';
import axios from 'axios';
import { UserDetailInfo, UserRole } from '@store/users/types';
import { AuthData, UserDetailsResponseData, UserResponseData } from '@models/index';


class AuthService {
    baseURL = `${baseURL}/authenticate`;
    authRequest = async ({ login, password }: AuthData ): Promise<UserDetailInfo> => {
        const jwt: string = await axios.post(this.baseURL, {
            login,
            password
        }).then(res => res.data);
        const user_full_info = await  this.getUserDetails(login, jwt);
        const { id, person: { id: user_id,organization, role }, ...rest } = user_full_info;
        const user: UserDetailInfo = {
            jwt,
            login,
            id: user_id,
            user_details_id: id,
            organization,
            role,
            ...rest
        };
        return { data: user };
    };
    getUser = async ({ login ,JWT }: {login: string, JWT: string}): Promise<UserResponseData> => {
        const res = await axios.get(`${baseURL}/user?login=${login}`, {
            headers: {
                'Authorization': `Bearer ${JWT}`
            },
        });
        return res.data;
    };

    getUsers = async (jwt: string) => {
        const res = await axios.get(`${baseURL}/user`, {
            headers: {
                'Authorization': `Bearer ${jwt}`
            },
        });
        const usersList = res.data;
        const userDetailsList = await Promise.all(usersList.map(async user => {
            const userDetails =await this.getUserDetails(user.login, jwt);
            return { ...user, ...userDetails };
        }
        ));

        return userDetailsList;
    };

    getUserDetails = async (login: string, jwt: string ): Promise<UserDetailsResponseData> => {
        const headers = {
            'Authorization': `Bearer ${jwt}`
        };
        const config = {
            headers
        };
        const res = await axios.get(`${baseURL}/user-details?person.login=${login}`, config);
        return res.data[0];
    };
}

export const BaseAPI = new AuthService();
