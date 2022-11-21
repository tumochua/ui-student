import axios from 'axios';

const api = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
    // withCredentials: true,
    timeout: 1000,
    // headers: {
    //     'Content-Type': 'application/json',
    // },
});

export const getListUsers = () => {
    return api.get('/api-get-list-users');
};

export const handRegisterUser = (user) => {
    return api.post('/api-register-user', user);
};

export const getTest = () => {
    return api.get('/api-test');
};
