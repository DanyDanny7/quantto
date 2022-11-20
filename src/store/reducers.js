import { combineReducers } from 'redux';

import auth from './auth/reducers';
import inventary from './inventary/reducers';

const rootReducer = combineReducers({
    auth,
    inventary,
});

export default rootReducer;