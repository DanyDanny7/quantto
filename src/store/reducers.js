import { combineReducers } from 'redux';

import auth from './auth/reducers';
import inventary from './inventary/reducers';
import counts from './counts/reducers';
import history from './history/reducers';

const appReducer = combineReducers({
    auth,
    counts,
    inventary,
    history,
})

const rootReducer = (state, action) => {
    if (action.type === 'LOGOUT_SUCCESS') {
        // devuelve el reducer al valor inicial cuando deslogueamos
        return appReducer(undefined, action)
    }

    return appReducer(state, action)
}

export default rootReducer;
