import {
    GET_OUT_BOUND_TYPE_LOADING,
    GET_OUT_BOUND_TYPE_SUCCESS,
    GET_OUT_BOUND_TYPE_REJECT,
} from "../../actions/outBoundType/get";

import {
    GET_OUT_BOUND_TYPE_ID_LOADING,
    GET_OUT_BOUND_TYPE_ID_REJECT,
    GET_OUT_BOUND_TYPE_ID_SUCCESS,
} from "../../actions/outBoundType/getId";

import {
    DELETE_OUT_BOUND_TYPE_LOADING,
    DELETE_OUT_BOUND_TYPE_REJECT,
    DELETE_OUT_BOUND_TYPE_SUCCESS,
    DELETE_OUT_BOUND_TYPE_RESET,
} from "../../actions/outBoundType/delete";

import {
    POST_OUT_BOUND_TYPE_LOADING,
    POST_OUT_BOUND_TYPE_REJECT,
    POST_OUT_BOUND_TYPE_SUCCESS,
    POST_OUT_BOUND_TYPE_RESET,
} from "../../actions/outBoundType/post";

import {
    PUT_OUT_BOUND_TYPE_LOADING,
    PUT_OUT_BOUND_TYPE_REJECT,
    PUT_OUT_BOUND_TYPE_SUCCESS,
    PUT_OUT_BOUND_TYPE_RESET,
} from "../../actions/outBoundType/put";



const stateInit = {
    isLoading: false,
    isSuccess: false,
    isReject: false,
    data: [],
    detail: {
        isLoading: false,
        isSuccess: false,
        isReject: false,
        data: {},
    },
    post: {
        isLoading: false,
        isSuccess: false,
        isReject: false,
        data: {},
    },
    put: {
        isLoading: false,
        isSuccess: false,
        isReject: false,
        data: {},
    },
    delete: {
        isLoading: false,
        isSuccess: false,
        isReject: false,
        data: {},
    },
}

const OutBoundTypeReducer = (state = stateInit, action) => {
    switch (action.type) {
        // ------------- Uom --------------------
        case GET_OUT_BOUND_TYPE_LOADING: return {
            ...state,
            isLoading: true,
            isSuccess: false,
            isReject: false,
            data: [],
        }
        case GET_OUT_BOUND_TYPE_SUCCESS: return {
            ...state,
            isLoading: false,
            isSuccess: true,
            isReject: false,
            ...action.payload,
        }
        case GET_OUT_BOUND_TYPE_REJECT: return {
            ...state,
            isLoading: false,
            isSuccess: false,
            isReject: true,
            data: [],
        }

        // ------------- Uom ID --------------------
        case GET_OUT_BOUND_TYPE_ID_LOADING: return {
            ...state,
            detail: {
                isLoading: true,
                isSuccess: false,
                isReject: false,
                data: {},
            }
        }
        case GET_OUT_BOUND_TYPE_ID_SUCCESS: return {
            ...state,
            detail: {
                isLoading: false,
                isSuccess: true,
                isReject: false,
                ...action.payload,
            }
        }
        case GET_OUT_BOUND_TYPE_ID_REJECT: return {
            ...state,
            detail: {
                isLoading: false,
                isSuccess: false,
                isReject: true,
                data: {},
            }
        }

        // ------------- Uom post --------------------
        case POST_OUT_BOUND_TYPE_RESET: return {
            ...state,
            post: {
                isLoading: false,
                isSuccess: false,
                isReject: false,
                data: {},
            }
        }
        case POST_OUT_BOUND_TYPE_LOADING: return {
            ...state,
            post: {
                ...state.post,
                isLoading: true,
                isSuccess: false,
                isReject: false,
                data: {},
            }
        }
        case POST_OUT_BOUND_TYPE_SUCCESS: return {
            ...state,
            post: {
                ...state.post,
                isLoading: false,
                isSuccess: true,
                isReject: false,
                data: action.payload,
            }
        }
        case POST_OUT_BOUND_TYPE_REJECT: return {
            ...state,
            post: {
                ...state.post,
                isLoading: false,
                isSuccess: false,
                isReject: true,
                data: {},
            }
        }

        // ------------- Uom put --------------------
        case PUT_OUT_BOUND_TYPE_RESET: return {
            ...state,
            put: {
                isLoading: false,
                isSuccess: false,
                isReject: false,
                data: {},
            }
        }
        case PUT_OUT_BOUND_TYPE_LOADING: return {
            ...state,
            put: {
                isLoading: true,
                isSuccess: false,
                isReject: false,
                data: {},
            }
        }
        case PUT_OUT_BOUND_TYPE_SUCCESS: return {
            ...state,
            put: {
                isLoading: false,
                isSuccess: true,
                isReject: false,
                data: action.payload,
            }
        }
        case PUT_OUT_BOUND_TYPE_REJECT: return {
            ...state,
            put: {
                isLoading: false,
                isSuccess: false,
                isReject: true,
                data: {},
            }
        }

        // ------------- Uom delete --------------------
        case DELETE_OUT_BOUND_TYPE_RESET: return {
            ...state,
            delete: {
                isLoading: false,
                isSuccess: false,
                isReject: false,
                data: {},
            }
        }
        case DELETE_OUT_BOUND_TYPE_LOADING: return {
            ...state,
            delete: {
                isLoading: true,
                isSuccess: false,
                isReject: false,
                data: {},
            }
        }
        case DELETE_OUT_BOUND_TYPE_SUCCESS: return {
            ...state,
            delete: {
                isLoading: false,
                isSuccess: true,
                isReject: false,
                data: action.payload,
            }
        }
        case DELETE_OUT_BOUND_TYPE_REJECT: return {
            ...state,
            delete: {
                isLoading: false,
                isSuccess: false,
                isReject: true,
                data: {},
            }
        }

        default: return state;
    }
}

export default OutBoundTypeReducer