import { combineReducers } from 'redux';

import auth from './auth/reducers';
import inventary from './inventary/reducers';
import counts from './counts/reducers';

const rootReducer = combineReducers({
    auth,
    counts,
    inventary,
});

export default rootReducer;