import {
    LOGIN_LOADING,
    LOGIN_SUCCESS,
    LOGIN_REJECT,
} from "../../actions/login";

import {
    REGISTER_LOADING,
    REGISTER_SUCCESS,
    REGISTER_REJECT,
} from "../../actions/register";

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
    allResp: {}
}

const loginReducer = (state = stateInit, action) => {
    switch (action.type) {
        case LOGIN_LOADING: return {
            ...state,
            isLoading: true,
            isSuccess: false,
            isReject: false,
            isLogged: false,
            token: null,
            dataUser: {},
            allResp: {}
        }
        case LOGIN_SUCCESS: return {
            ...state,
            isLoading: false,
            isSuccess: true,
            isReject: false,
            isLogged: true,
            token: null,
            dataUser: action.payload.data,
            allResp: action.payload
        }
        case LOGIN_REJECT: return {
            ...state,
            isLoading: false,
            isSuccess: false,
            isReject: true,
            isLogged: false,
            token: null,
            dataUser: {},
            allResp: action.payload
        }
        case REGISTER_LOADING: return {
            ...state,
            isLoading: true,
            isSuccess: false,
            isReject: false,
            isLogged: false,
            token: null,
            dataUser: {},
            allResp: {}
        }
        case REGISTER_SUCCESS: return {
            ...state,
            isLoading: false,
            isSuccess: true,
            isReject: false,
            isLogged: true,
            token: null,
            dataUser: action.payload.data,
            allResp: action.payload
        }
        case REGISTER_REJECT: return {
            ...state,
            isLoading: false,
            isSuccess: false,
            isReject: true,
            isLogged: false,
            token: null,
            dataUser: {},
            allResp: action.payload
        }

        case LOGOUT_SUCCESS: return stateInit

        default: return state;
    }
}

export default loginReducer
