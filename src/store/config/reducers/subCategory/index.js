import {
    GET_SUB_CATEGORY_LOADING,
    GET_SUB_CATEGORY_SUCCESS,
    GET_SUB_CATEGORY_REJECT,
} from "../../actions/subCategory/get";

import {
    GET_SUB_CATEGORY_ID_LOADING,
    GET_SUB_CATEGORY_ID_REJECT,
    GET_SUB_CATEGORY_ID_SUCCESS,
} from "../../actions/subCategory/getId";

import {
    DELETE_SUB_CATEGORY_LOADING,
    DELETE_SUB_CATEGORY_REJECT,
    DELETE_SUB_CATEGORY_SUCCESS,
    DELETE_SUB_CATEGORY_RESET,
} from "../../actions/subCategory/delete";

import {
    POST_SUB_CATEGORY_LOADING,
    POST_SUB_CATEGORY_REJECT,
    POST_SUB_CATEGORY_SUCCESS,
    POST_SUB_CATEGORY_RESET,
} from "../../actions/subCategory/post";

import {
    PUT_SUB_CATEGORY_LOADING,
    PUT_SUB_CATEGORY_REJECT,
    PUT_SUB_CATEGORY_SUCCESS,
    PUT_SUB_CATEGORY_RESET,
} from "../../actions/subCategory/put";



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

const SubCategoryReducer = (state = stateInit, action) => {
    switch (action.type) {
        // ------------- Uom --------------------
        case GET_SUB_CATEGORY_LOADING: return {
            ...state,
            isLoading: true,
            isSuccess: false,
            isReject: false,
            data: [],
        }
        case GET_SUB_CATEGORY_SUCCESS: return {
            ...state,
            isLoading: false,
            isSuccess: true,
            isReject: false,
            ...action.payload,
        }
        case GET_SUB_CATEGORY_REJECT: return {
            ...state,
            isLoading: false,
            isSuccess: false,
            isReject: true,
            data: [],
        }

        // ------------- Uom ID --------------------
        case GET_SUB_CATEGORY_ID_LOADING: return {
            ...state,
            detail: {
                isLoading: true,
                isSuccess: false,
                isReject: false,
                data: {},
            }
        }
        case GET_SUB_CATEGORY_ID_SUCCESS: return {
            ...state,
            detail: {
                isLoading: false,
                isSuccess: true,
                isReject: false,
                ...action.payload,
            }
        }
        case GET_SUB_CATEGORY_ID_REJECT: return {
            ...state,
            detail: {
                isLoading: false,
                isSuccess: false,
                isReject: true,
                data: {},
            }
        }

        // ------------- Uom post --------------------
        case POST_SUB_CATEGORY_RESET: return {
            ...state,
            post: {
                isLoading: false,
                isSuccess: false,
                isReject: false,
                data: {},
            }
        }
        case POST_SUB_CATEGORY_LOADING: return {
            ...state,
            post: {
                ...state.post,
                isLoading: true,
                isSuccess: false,
                isReject: false,
                data: {},
            }
        }
        case POST_SUB_CATEGORY_SUCCESS: return {
            ...state,
            post: {
                ...state.post,
                isLoading: false,
                isSuccess: true,
                isReject: false,
                data: action.payload,
            }
        }
        case POST_SUB_CATEGORY_REJECT: return {
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
        case PUT_SUB_CATEGORY_RESET: return {
            ...state,
            put: {
                isLoading: false,
                isSuccess: false,
                isReject: false,
                data: {},
            }
        }
        case PUT_SUB_CATEGORY_LOADING: return {
            ...state,
            put: {
                isLoading: true,
                isSuccess: false,
                isReject: false,
                data: {},
            }
        }
        case PUT_SUB_CATEGORY_SUCCESS: return {
            ...state,
            put: {
                isLoading: false,
                isSuccess: true,
                isReject: false,
                data: action.payload,
            }
        }
        case PUT_SUB_CATEGORY_REJECT: return {
            ...state,
            put: {
                isLoading: false,
                isSuccess: false,
                isReject: true,
                data: {},
            }
        }

        // ------------- Uom delete --------------------
        case DELETE_SUB_CATEGORY_RESET: return {
            ...state,
            delete: {
                isLoading: false,
                isSuccess: false,
                isReject: false,
                data: {},
            }
        }
        case DELETE_SUB_CATEGORY_LOADING: return {
            ...state,
            delete: {
                isLoading: true,
                isSuccess: false,
                isReject: false,
                data: {},
            }
        }
        case DELETE_SUB_CATEGORY_SUCCESS: return {
            ...state,
            delete: {
                isLoading: false,
                isSuccess: true,
                isReject: false,
                data: action.payload,
            }
        }
        case DELETE_SUB_CATEGORY_REJECT: return {
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

export default SubCategoryReducer