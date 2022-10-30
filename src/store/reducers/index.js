import { combineReducers } from 'redux';

import loginReducer from './auth/loginReducer';

const rootReducer = combineReducers({
    loginReducer,
});

export default rootReducer;