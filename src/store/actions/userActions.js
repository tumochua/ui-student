// import { useNavigate } from 'react-router-dom';

import { handleApiLogin } from '../../services/apis';

import { POST_USER } from '../type/todos';

// import config from '@/config';

export const createUser = (user) => async (dispatch) => {
    // const navigate = useNavigate();
    try {
        console.log('clik me');
        const response = await handleApiLogin(user);
        const result = response.data;
        console.log(result);
        if (result.statusCode === 2) {
            await dispatch({ type: POST_USER, payload: result });
            // navigate(config.routes.profile);
            return;
        }
    } catch (error) {
        console.log(error);
    }
};
