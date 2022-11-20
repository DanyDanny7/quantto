import {
    REGISTER_LOADING,
    REGISTER_REJECT,
    REGISTER_SUCCESS,
} from "../../actions/register";

const stateInit = {
    isLoading: false,
    isSuccess: false,
    isReject: false,
    data: {},
}

const registerReducer = (state = stateInit, action) => {
    switch (action.type) {
        case REGISTER_LOADING: return {
            ...state,
            isLoading: true
        }
        case REGISTER_SUCCESS: return {
            ...state,
            isLoading: false,
            isSuccess: true,
            data: action.payload
        }
        case REGISTER_REJECT: return {
            ...state,
            isLoading: false,
            isReject: true,
        }

        default: return state;
    }
}

export default registerReducer