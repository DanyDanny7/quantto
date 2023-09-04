import { combineReducers } from 'redux';

import auth from './auth/reducers';
import inventary from './inventary/reducers';
import counts from './counts/reducers';
import config from './config/reducers';
import history from './history/reducers';
import product from './product/reducers';
import transfer from './transfer/reducers';
import warehouse from './warehouse/reducers';
import inbound from './inbound/reducers';
import outbound from './outbound/reducers';

const appReducer = combineReducers({
    auth,
    counts,
    config,
    inventary,
    history,
    product,
    transfer,
    warehouse,
    inbound,
    outbound,
})

const rootReducer = (state, action) => {
    if (action.type === 'LOGOUT_SUCCESS') {
        // devuelve el reducer al valor inicial cuando deslogueamos
        return appReducer(undefined, action)
    }

    return appReducer(state, action)
}

export default rootReducer;
