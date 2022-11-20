import axios from 'axios';

const api = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
    withCredentials: true,
    headers: {
        'Content-type': 'application/json',
        // Authorization: "Bearer " + "TUMOCHUA",
    },
});

export const getListUsers = () => {
    return api.get('/api-get-list-users');
};
export const getTest = () => {
    return api.get('/api-test');
};
