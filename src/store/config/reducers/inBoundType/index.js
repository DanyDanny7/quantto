import {
    GET_IN_BOUND_TYPE_LOADING,
    GET_IN_BOUND_TYPE_SUCCESS,
    GET_IN_BOUND_TYPE_REJECT,
} from "../../actions/inBoundType/get";

import {
    GET_IN_BOUND_TYPE_ID_LOADING,
    GET_IN_BOUND_TYPE_ID_REJECT,
    GET_IN_BOUND_TYPE_ID_SUCCESS,
} from "../../actions/inBoundType/getId";

import {
    DELETE_IN_BOUND_TYPE_LOADING,
    DELETE_IN_BOUND_TYPE_REJECT,
    DELETE_IN_BOUND_TYPE_SUCCESS,
    DELETE_IN_BOUND_TYPE_RESET,
} from "../../actions/inBoundType/delete";

import {
    POST_IN_BOUND_TYPE_LOADING,
    POST_IN_BOUND_TYPE_REJECT,
    POST_IN_BOUND_TYPE_SUCCESS,
    POST_IN_BOUND_TYPE_RESET,
} from "../../actions/inBoundType/post";

import {
    PUT_IN_BOUND_TYPE_LOADING,
    PUT_IN_BOUND_TYPE_REJECT,
    PUT_IN_BOUND_TYPE_SUCCESS,
    PUT_IN_BOUND_TYPE_RESET,
} from "../../actions/inBoundType/put";



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

const InBoundTypeReducer = (state = stateInit, action) => {
    switch (action.type) {
        // ------------- Uom --------------------
        case GET_IN_BOUND_TYPE_LOADING: return {
            ...state,
            isLoading: true,
            isSuccess: false,
            isReject: false,
            data: [],
        }
        case GET_IN_BOUND_TYPE_SUCCESS: return {
            ...state,
            isLoading: false,
            isSuccess: true,
            isReject: false,
            ...action.payload,
        }
        case GET_IN_BOUND_TYPE_REJECT: return {
            ...state,
            isLoading: false,
            isSuccess: false,
            isReject: true,
            data: [],
        }

        // ------------- Uom ID --------------------
        case GET_IN_BOUND_TYPE_ID_LOADING: return {
            ...state,
            detail: {
                isLoading: true,
                isSuccess: false,
                isReject: false,
                data: {},
            }
        }
        case GET_IN_BOUND_TYPE_ID_SUCCESS: return {
            ...state,
            detail: {
                isLoading: false,
                isSuccess: true,
                isReject: false,
                ...action.payload,
            }
        }
        case GET_IN_BOUND_TYPE_ID_REJECT: return {
            ...state,
            detail: {
                isLoading: false,
                isSuccess: false,
                isReject: true,
                data: {},
            }
        }

        // ------------- Uom post --------------------
        case POST_IN_BOUND_TYPE_RESET: return {
            ...state,
            post: {
                isLoading: false,
                isSuccess: false,
                isReject: false,
                data: {},
            }
        }
        case POST_IN_BOUND_TYPE_LOADING: return {
            ...state,
            post: {
                ...state.post,
                isLoading: true,
                isSuccess: false,
                isReject: false,
                data: {},
            }
        }
        case POST_IN_BOUND_TYPE_SUCCESS: return {
            ...state,
            post: {
                ...state.post,
                isLoading: false,
                isSuccess: true,
                isReject: false,
                data: action.payload,
            }
        }
        case POST_IN_BOUND_TYPE_REJECT: return {
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
        case PUT_IN_BOUND_TYPE_RESET: return {
            ...state,
            put: {
                isLoading: false,
                isSuccess: false,
                isReject: false,
                data: {},
            }
        }
        case PUT_IN_BOUND_TYPE_LOADING: return {
            ...state,
            put: {
                isLoading: true,
                isSuccess: false,
                isReject: false,
                data: {},
            }
        }
        case PUT_IN_BOUND_TYPE_SUCCESS: return {
            ...state,
            put: {
                isLoading: false,
                isSuccess: true,
                isReject: false,
                data: action.payload,
            }
        }
        case PUT_IN_BOUND_TYPE_REJECT: return {
            ...state,
            put: {
                isLoading: false,
                isSuccess: false,
                isReject: true,
                data: {},
            }
        }

        // ------------- Uom delete --------------------
        case DELETE_IN_BOUND_TYPE_RESET: return {
            ...state,
            delete: {
                isLoading: false,
                isSuccess: false,
                isReject: false,
                data: {},
            }
        }
        case DELETE_IN_BOUND_TYPE_LOADING: return {
            ...state,
            delete: {
                isLoading: true,
                isSuccess: false,
                isReject: false,
                data: {},
            }
        }
        case DELETE_IN_BOUND_TYPE_SUCCESS: return {
            ...state,
            delete: {
                isLoading: false,
                isSuccess: true,
                isReject: false,
                data: action.payload,
            }
        }
        case DELETE_IN_BOUND_TYPE_REJECT: return {
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

export default InBoundTypeReducer