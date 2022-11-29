// import { useNavigate } from 'react-router-dom';

import { handleApiLogin } from '../../services/apis';

import { POST_USER } from '../type/todos';

// import config from '@/config';

export const createUser = (user) => async (dispatch) => {
    // const navigate = useNavigate();
    try {
        const response = await handleApiLogin(user);
        const result = response.data;
        if (result.data.statusCode === 4) {
            return 'The information you are entering is incorrect, please login again later';
        }
        if (result.data.statusCode === 2) {
            await dispatch({ type: POST_USER, payload: result });
            const user = JSON.stringify(result);
            localStorage.setItem('user', user);
            return;
        }
    } catch (error) {
        console.log(error);
    }
};
