import { baseURL } from './config';
import axios from 'axios';

type AuthData = {
  login: string
  password: string
}

class AuthService {
    baseURL = `${baseURL}/authenticate`;

    authRequest = async ({ login, password }: AuthData ) => {
        const res = await axios.post(this.baseURL, {
            email: login,
            password
        });
        return res;
    };
}

export default new AuthService();
