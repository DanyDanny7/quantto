import {
    LOGIN_LOADING,
    LOGIN_SUCCESS,
    LOGIN_REJECT,
} from "../../actions/login";

import {
    LOGOUT_SUCCESS,
} from "../../actions/logout"

const stateInit = {
    isLoading: false,
    isSuccess: false,
    isReject: false,
    isLogged: false,
    token: null,
    dataUser: {},
}

const loginReducer = (state = stateInit, action) => {
    switch (action.type) {
        case LOGIN_LOADING: return {
            ...state,
            isLoading: true
        }
        case LOGIN_SUCCESS: return {
            ...state,
            isLoading: false,
            isSuccess: true,
            isLogged: true,
            dataUser: action.payload
        }
        case LOGIN_REJECT: return {
            ...state,
            isLoading: false,
            isReject: true,
        }

        case LOGOUT_SUCCESS: return stateInit

        default: return state;
    }
}

export default loginReducer