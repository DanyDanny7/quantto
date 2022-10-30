import {
    LOGIN_LOADING,
    LOGIN_SUCCESS,
    LOGIN_REJECT,
} from "../../actions/auth/loginAction"

const stateInit = {
    isLoading: false,
    isSuccess: false,
    isReject: false,
    isLoged: false,
    token: null,
    user: {},
}

const charactersReducer = (state = stateInit, action) => {
    switch (action.type) {
        case LOGIN_LOADING: return {
            ...state,
            ...state.getCharacters,
            isLoading: true
        }
        case LOGIN_SUCCESS: return {
            ...state,
            isLoading: false,
            isSuccess: true,
            isLoged: true,
            token: action.payload.token,
            user: action.payload.user
        }
        case LOGIN_REJECT: return {
            ...state,
            isLoading: false,
            isReject: true
        }

        default: return state;
    }
}

export default charactersReducer