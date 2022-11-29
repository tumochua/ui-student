import { combineReducers } from 'redux';
import todoReducer from './todoReducer';
import userReduces from './userReducers';

const rootReducer = combineReducers({
    myTodos: todoReducer,
    users: userReduces,
});

export default rootReducer;
