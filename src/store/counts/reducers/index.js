import {
    GET_COUNTS_LOADING,
    GET_COUNTS_SUCCESS,
    GET_COUNTS_REJECT,
} from "../actions/getCounts";

import {
    POST_COUNT_RESET,
    POST_COUNT_LOADING,
    POST_COUNT_SUCCESS,
    POST_COUNT_REJECT,
} from "../actions/postCounts";

import {
    PUT_COUNT_RESET,
    PUT_COUNT_LOADING,
    PUT_COUNT_SUCCESS,
    PUT_COUNT_REJECT,
} from "../actions/putCounts";

import {
    DELETE_COUNT_RESET,
    DELETE_COUNT_LOADING,
    DELETE_COUNT_SUCCESS,
    DELETE_COUNT_REJECT,
} from "../actions/deleteCounts";

const stateInit = {
    isLoading: false,
    isSuccess: false,
    isReject: false,
    data: [],
    post: {
        isLoading: false,
        isSuccess: false,
        isReject: false,
        data: {},
        error: null
    },
    put: {
        isLoading: false,
        isSuccess: false,
        isReject: false,
        data: {},
        error: null
    },
    delete: {
        isLoading: false,
        isSuccess: false,
        isReject: false,
        data: {},
        error: null
    },
}

const inventaryReducer = (state = stateInit, action) => {
    switch (action.type) {
        // ------------- GET COUNTS --------------------
        case GET_COUNTS_LOADING: return {
            ...state,
            isLoading: true,
            isSuccess: false,
            isReject: false,
            data: [],
        }
        case GET_COUNTS_SUCCESS: return {
            ...state,
            isLoading: false,
            isSuccess: true,
            isReject: false,
            data: action.payload,
        }
        case GET_COUNTS_REJECT: return {
            ...state,
            isLoading: false,
            isSuccess: false,
            isReject: true,
            data: [],
        }
        // ------------- POST COUNT --------------------
        case POST_COUNT_RESET: return {
            ...state,
            post: {
                ...state.post,
                isLoading: false,
                isSuccess: false,
                isReject: false,
                data: {},
                error: null
            }
        }
        case POST_COUNT_LOADING: return {
            ...state,
            post: {
                ...state.post,
                isLoading: true,
                isSuccess: false,
                isReject: false,
                data: {},
                error: null
            }
        }
        case POST_COUNT_SUCCESS: return {
            ...state,
            post: {
                ...state.post,
                isLoading: false,
                isSuccess: true,
                isReject: false,
                data: action.payload,
                error: null
            }
        }
        case POST_COUNT_REJECT: return {
            ...state,
            post: {
                ...state.post,
                isLoading: false,
                isSuccess: false,
                isReject: true,
                data: {},
                error: action.payload,
            }
        }
        // ------------- PUT COUNT --------------------
        case PUT_COUNT_RESET: return {
            ...state,
            put: {
                ...state.put,
                isLoading: false,
                isSuccess: false,
                isReject: false,
                data: {},
                error: null
            }
        }
        case PUT_COUNT_LOADING: return {
            ...state,
            put: {
                ...state.put,
                isLoading: true,
                isSuccess: false,
                isReject: false,
                data: {},
                error: null
            }
        }
        case PUT_COUNT_SUCCESS: return {
            ...state,
            put: {
                ...state.put,
                isLoading: false,
                isSuccess: true,
                isReject: false,
                data: action.payload,
                error: null
            }
        }
        case PUT_COUNT_REJECT: return {
            ...state,
            put: {
                ...state.put,
                isLoading: false,
                isSuccess: false,
                isReject: true,
                data: {},
                error: action.payload,
            }
        }
        // ------------- DELETE COUNT --------------------
        case DELETE_COUNT_RESET: return {
            ...state,
            delete: {
                ...state.delete,
                isLoading: false,
                isSuccess: false,
                isReject: false,
                data: {},
                error: null
            }
        }
        case DELETE_COUNT_LOADING: return {
            ...state,
            delete: {
                ...state.delete,
                isLoading: true,
                isSuccess: false,
                isReject: false,
                data: {},
                error: null
            }
        }
        case DELETE_COUNT_SUCCESS: return {
            ...state,
            delete: {
                ...state.delete,
                isLoading: false,
                isSuccess: true,
                isReject: false,
                data: action.payload,
                error: null
            }
        }
        case DELETE_COUNT_REJECT: return {
            ...state,
            delete: {
                ...state.delete,
                isLoading: false,
                isSuccess: false,
                isReject: true,
                data: {},
                error: action.payload,
            }
        }

        default: return state;
    }
}

export default inventaryReducer