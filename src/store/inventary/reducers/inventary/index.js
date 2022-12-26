import {
    GET_INVENTARY_LOADING,
    GET_INVENTARY_SUCCESS,
    GET_INVENTARY_REJECT,
} from "../../actions/inventary/getInventary";

import {
    GET_INVENTARY_COUNTS_LOADING,
    GET_INVENTARY_COUNTS_SUCCESS,
    GET_INVENTARY_COUNTS_REJECT,
} from "../../actions/inventary/counts/getCounts";

import {
    GET_INVENTARY_DETAIL_LOADING,
    GET_INVENTARY_DETAIL_SUCCESS,
    GET_INVENTARY_DETAIL_REJECT,
} from "../../actions/inventary/detail/getDetail";


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
    },
    detail: {
        isLoading: false,
        isSuccess: false,
        isReject: false,
        data: [],
    },
}

const inventaryReducer = (state = stateInit, action) => {
    switch (action.type) {
        // ------------- Inventary --------------------
        case GET_INVENTARY_LOADING: return {
            ...state,
            isLoading: true,
            isSuccess: false,
            isReject: false,
            data: [],
        }
        case GET_INVENTARY_SUCCESS: return {
            ...state,
            isLoading: false,
            isSuccess: true,
            isReject: false,
            data: action.payload,
        }
        case GET_INVENTARY_REJECT: return {
            ...state,
            isLoading: false,
            isSuccess: false,
            isReject: true,
            data: [],
        }

        // ------------- Inventary Counts --------------------
        case GET_INVENTARY_COUNTS_LOADING: return {
            ...state,
            counts: {
                ...state.counts,
                isLoading: true,
                isSuccess: false,
                isReject: false,
                data: [],
            }
        }
        case GET_INVENTARY_COUNTS_SUCCESS: return {
            ...state,
            counts: {
                ...state.counts,
                isLoading: false,
                isSuccess: true,
                isReject: false,
                data: action.payload,
            }
        }
        case GET_INVENTARY_COUNTS_REJECT: return {
            ...state,
            counts: {
                ...state.counts,
                isLoading: false,
                isSuccess: false,
                isReject: true,
                data: [],
            }
        }

        // ------------- Inventary Detail --------------------
        case GET_INVENTARY_DETAIL_LOADING: return {
            ...state,
            detail: {
                ...state.detail,
                isLoading: true,
                isSuccess: false,
                isReject: false,
                data: [],
            }
        }
        case GET_INVENTARY_DETAIL_SUCCESS: return {
            ...state,
            detail: {
                ...state.detail,
                isLoading: false,
                isSuccess: true,
                isReject: false,
                data: action.payload,
            }
        }
        case GET_INVENTARY_DETAIL_REJECT: return {
            ...state,
            detail: {
                ...state.detail,
                isLoading: false,
                isSuccess: false,
                isReject: true,
                data: [],
            }
        }

        default: return state;
    }
}

export default inventaryReducer