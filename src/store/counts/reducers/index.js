import {
    GET_COUNTS_LOADING,
    GET_COUNTS_SUCCESS,
    GET_COUNTS_REJECT,
} from "../actions/getCounts";

const stateInit = {
    isLoading: false,
    isSuccess: false,
    isReject: false,
    data: [],
}

const inventaryReducer = (state = stateInit, action) => {
    switch (action.type) {
        // ------------- Inventary --------------------
        case GET_COUNTS_LOADING: return {
            ...state,
            isLoading: true
        }
        case GET_COUNTS_SUCCESS: return {
            ...state,
            isLoading: false,
            isSuccess: true,
            data: action.payload
        }
        case GET_COUNTS_REJECT: return {
            ...state,
            isLoading: false,
            isReject: true,
        }

        default: return state;
    }
}

export default inventaryReducer