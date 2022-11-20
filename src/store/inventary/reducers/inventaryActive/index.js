import {
    GET_INVENTARY_ACTIVE_LOADING,
    GET_INVENTARY_ACTIVE_SUCCESS,
    GET_INVENTARY_ACTIVE_REJECT,
} from "../../actions/inventaryActive/InventaryActiveGet";

import {
    GET_INVENTARY_ACTIVE_COUNTS_LOADING,
    GET_INVENTARY_ACTIVE_COUNTS_SUCCESS,
    GET_INVENTARY_ACTIVE_COUNTS_REJECT,
} from "../../actions/inventaryActive/counts/getCounts";

const stateInit = {
    isLoading: false,
    isSuccess: false,
    isReject: false,
    data: [],
    counts: {
        isLoading: false,
        isSuccess: false,
        isReject: false,
        data: [],
    }
}

const inventaryActiveReducer = (state = stateInit, action) => {
    switch (action.type) {
        // ------------- Inventary Active --------------------
        case GET_INVENTARY_ACTIVE_LOADING: return {
            ...state,
            isLoading: true
        }
        case GET_INVENTARY_ACTIVE_SUCCESS: return {
            ...state,
            isLoading: false,
            isSuccess: true,
            data: action.payload
        }
        case GET_INVENTARY_ACTIVE_REJECT: return {
            ...state,
            isLoading: false,
            isReject: true,
        }

        // ------------- Inventary Active Counts --------------------
        case GET_INVENTARY_ACTIVE_COUNTS_LOADING: return {
            ...state,
            counts: {
                ...state.counts,
                isLoading: true
            }
        }
        case GET_INVENTARY_ACTIVE_COUNTS_SUCCESS: return {
            ...state,
            counts: {
                ...state.counts,
                isLoading: false,
                isSuccess: true,
                data: action.payload,
            }
        }
        case GET_INVENTARY_ACTIVE_COUNTS_REJECT: return {
            ...state,
            counts: {
                ...state.counts,
                isLoading: false,
                isReject: true,
            }
        }

        default: return state;
    }
}

export default inventaryActiveReducer