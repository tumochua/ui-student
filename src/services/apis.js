import axios from 'axios';
// import Cookies from 'js-cookie';
const api = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
    withCredentials: true,
    // timeout: 1000,
    // headers: {
    //     // 'Content-Type': 'application/json',
    //     // 'Access-Control-Allow-Origin': '*',
    // },
});

export const getListUsers = () => {
    // console.log(Cookies.get('accessToken'));
    return api.get('/api-get-list-users');
};

export const handRegisterUser = (user) => {
    return api.post('/api-register-user', user);
};

export const handleApiLogin = (user) => {
    return api.post('api-login', user);
};

export const apiGetProfileUser = () => {
    return api.get(`/api-get-profile-user-by-id`);
};

export const handleApiEditUser = (userData) => {
    // console.log('check userData', userData);
    return api.put('/api-edit-user', userData);
};

export const apiGetListStudentOfClass = (className) => {
    // console.log('check className', className);
    return api.get(`/api-list-students-of-class?className=${className}`);
};
