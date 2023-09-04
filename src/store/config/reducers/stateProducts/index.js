import {
    GET_STATE_PRODUCTS_LOADING,
    GET_STATE_PRODUCTS_SUCCESS,
    GET_STATE_PRODUCTS_REJECT,
} from "../../actions/stateProducts/get";

import {
    GET_STATE_PRODUCTS_ID_LOADING,
    GET_STATE_PRODUCTS_ID_REJECT,
    GET_STATE_PRODUCTS_ID_SUCCESS,
} from "../../actions/stateProducts/getId";

import {
    DELETE_STATE_PRODUCTS_LOADING,
    DELETE_STATE_PRODUCTS_REJECT,
    DELETE_STATE_PRODUCTS_SUCCESS,
    DELETE_STATE_PRODUCTS_RESET,
} from "../../actions/stateProducts/delete";

import {
    POST_STATE_PRODUCTS_LOADING,
    POST_STATE_PRODUCTS_REJECT,
    POST_STATE_PRODUCTS_SUCCESS,
    POST_STATE_PRODUCTS_RESET,
} from "../../actions/stateProducts/post";

import {
    PUT_STATE_PRODUCTS_LOADING,
    PUT_STATE_PRODUCTS_REJECT,
    PUT_STATE_PRODUCTS_SUCCESS,
    PUT_STATE_PRODUCTS_RESET,
} from "../../actions/stateProducts/put";



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

const UomReducer = (state = stateInit, action) => {
    switch (action.type) {
        // ------------- Uom --------------------
        case GET_STATE_PRODUCTS_LOADING: return {
            ...state,
            isLoading: true,
            isSuccess: false,
            isReject: false,
            data: [],
        }
        case GET_STATE_PRODUCTS_SUCCESS: return {
            ...state,
            isLoading: false,
            isSuccess: true,
            isReject: false,
            ...action.payload,
        }
        case GET_STATE_PRODUCTS_REJECT: return {
            ...state,
            isLoading: false,
            isSuccess: false,
            isReject: true,
            data: [],
        }

        // ------------- Uom ID --------------------
        case GET_STATE_PRODUCTS_ID_LOADING: return {
            ...state,
            detail: {
                isLoading: true,
                isSuccess: false,
                isReject: false,
                data: {},
            }
        }
        case GET_STATE_PRODUCTS_ID_SUCCESS: return {
            ...state,
            detail: {
                isLoading: false,
                isSuccess: true,
                isReject: false,
                ...action.payload,
            }
        }
        case GET_STATE_PRODUCTS_ID_REJECT: return {
            ...state,
            detail: {
                isLoading: false,
                isSuccess: false,
                isReject: true,
                data: {},
            }
        }

        // ------------- Uom post --------------------
        case POST_STATE_PRODUCTS_RESET: return {
            ...state,
            post: {
                isLoading: false,
                isSuccess: false,
                isReject: false,
                data: {},
            }
        }
        case POST_STATE_PRODUCTS_LOADING: return {
            ...state,
            post: {
                ...state.post,
                isLoading: true,
                isSuccess: false,
                isReject: false,
                data: {},
            }
        }
        case POST_STATE_PRODUCTS_SUCCESS: return {
            ...state,
            post: {
                ...state.post,
                isLoading: false,
                isSuccess: true,
                isReject: false,
                data: action.payload,
            }
        }
        case POST_STATE_PRODUCTS_REJECT: return {
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
        case PUT_STATE_PRODUCTS_RESET: return {
            ...state,
            put: {
                isLoading: false,
                isSuccess: false,
                isReject: false,
                data: {},
            }
        }
        case PUT_STATE_PRODUCTS_LOADING: return {
            ...state,
            put: {
                isLoading: true,
                isSuccess: false,
                isReject: false,
                data: {},
            }
        }
        case PUT_STATE_PRODUCTS_SUCCESS: return {
            ...state,
            put: {
                isLoading: false,
                isSuccess: true,
                isReject: false,
                data: action.payload,
            }
        }
        case PUT_STATE_PRODUCTS_REJECT: return {
            ...state,
            put: {
                isLoading: false,
                isSuccess: false,
                isReject: true,
                data: {},
            }
        }

        // ------------- Uom delete --------------------
        case DELETE_STATE_PRODUCTS_RESET: return {
            ...state,
            delete: {
                isLoading: false,
                isSuccess: false,
                isReject: false,
                data: {},
            }
        }
        case DELETE_STATE_PRODUCTS_LOADING: return {
            ...state,
            delete: {
                isLoading: true,
                isSuccess: false,
                isReject: false,
                data: {},
            }
        }
        case DELETE_STATE_PRODUCTS_SUCCESS: return {
            ...state,
            delete: {
                isLoading: false,
                isSuccess: true,
                isReject: false,
                data: action.payload,
            }
        }
        case DELETE_STATE_PRODUCTS_REJECT: return {
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

export default UomReducer