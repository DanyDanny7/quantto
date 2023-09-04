import {
    GET_INBOUND_LOADING,
    GET_INBOUND_SUCCESS,
    GET_INBOUND_REJECT,
} from "../../actions/outbound/get";

import {
    GET_INBOUND_ID_LOADING,
    GET_INBOUND_ID_REJECT,
    GET_INBOUND_ID_SUCCESS,
} from "../../actions/outbound/getId";

import {
    DELETE_INBOUND_LOADING,
    DELETE_INBOUND_REJECT,
    DELETE_INBOUND_SUCCESS,
    DELETE_INBOUND_RESET,
} from "../../actions/outbound/delete";

import {
    POST_INBOUND_LOADING,
    POST_INBOUND_REJECT,
    POST_INBOUND_SUCCESS,
    POST_INBOUND_RESET,
} from "../../actions/outbound/post";

import {
    PUT_INBOUND_LOADING,
    PUT_INBOUND_REJECT,
    PUT_INBOUND_SUCCESS,
    PUT_INBOUND_RESET,
} from "../../actions/outbound/put";

import {
    DELETE_INBOUND_DETAIL_LOADING,
    DELETE_INBOUND_DETAIL_REJECT,
    DELETE_INBOUND_DETAIL_SUCCESS,
    DELETE_INBOUND_DETAIL_RESET,
} from "../../actions/outboundDetail/delete";

import {
    POST_INBOUND_DETAIL_LOADING,
    POST_INBOUND_DETAIL_REJECT,
    POST_INBOUND_DETAIL_SUCCESS,
    POST_INBOUND_DETAIL_RESET,
} from "../../actions/outboundDetail/post";

import {
    PUT_INBOUND_DETAIL_LOADING,
    PUT_INBOUND_DETAIL_REJECT,
    PUT_INBOUND_DETAIL_SUCCESS,
    PUT_INBOUND_DETAIL_RESET,
} from "../../actions/outboundDetail/put";


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
    outboundDetail: {
        isLoading: false,
        isSuccess: false,
        isReject: false,
        data: [],
    },
    postOutboundDetail: {
        isLoading: false,
        isSuccess: false,
        isReject: false,
        data: {},
    },
    putOutboundDetail: {
        isLoading: false,
        isSuccess: false,
        isReject: false,
        data: {},
    },
    deleteOutboundDetail: {
        isLoading: false,
        isSuccess: false,
        isReject: false,
        data: {},
    },
}

const OutboundReducer = (state = stateInit, action) => {
    switch (action.type) {
        // ------------- Outbound --------------------
        case GET_INBOUND_LOADING: return {
            ...state,
            isLoading: true,
            isSuccess: false,
            isReject: false,
            data: [],
        }
        case GET_INBOUND_SUCCESS: return {
            ...state,
            isLoading: false,
            isSuccess: true,
            isReject: false,
            ...action.payload,
        }
        case GET_INBOUND_REJECT: return {
            ...state,
            isLoading: false,
            isSuccess: false,
            isReject: true,
            data: [],
        }

        // ------------- Outbound ID --------------------
        case GET_INBOUND_ID_LOADING: return {
            ...state,
            detail: {
                isLoading: true,
                isSuccess: false,
                isReject: false,
                data: {},
            }
        }
        case GET_INBOUND_ID_SUCCESS: return {
            ...state,
            detail: {
                isLoading: false,
                isSuccess: true,
                isReject: false,
                ...action.payload,
            }
        }
        case GET_INBOUND_ID_REJECT: return {
            ...state,
            detail: {
                isLoading: false,
                isSuccess: false,
                isReject: true,
                data: {},
            }
        }

        // ------------- Outbound post --------------------
        case POST_INBOUND_RESET: return {
            ...state,
            post: {
                isLoading: false,
                isSuccess: false,
                isReject: false,
                data: {},
            }
        }
        case POST_INBOUND_LOADING: return {
            ...state,
            post: {
                isLoading: true,
                isSuccess: false,
                isReject: false,
                data: {},
            }
        }
        case POST_INBOUND_SUCCESS: return {
            ...state,
            post: {
                isLoading: false,
                isSuccess: true,
                isReject: false,
                data: action.payload,
            }
        }
        case POST_INBOUND_REJECT: return {
            ...state,
            post: {
                isLoading: false,
                isSuccess: false,
                isReject: true,
                data: {},
            }
        }

        // ------------- Outbound put --------------------
        case PUT_INBOUND_RESET: return {
            ...state,
            put: {
                isLoading: false,
                isSuccess: false,
                isReject: false,
                data: {},
            }
        }
        case PUT_INBOUND_LOADING: return {
            ...state,
            put: {
                isLoading: true,
                isSuccess: false,
                isReject: false,
                data: {},
            }
        }
        case PUT_INBOUND_SUCCESS: return {
            ...state,
            put: {
                isLoading: false,
                isSuccess: true,
                isReject: false,
                data: action.payload,
            }
        }
        case PUT_INBOUND_REJECT: return {
            ...state,
            put: {
                isLoading: false,
                isSuccess: false,
                isReject: true,
                data: {},
            }
        }

        // ------------- Outbound delete --------------------
        case  DELETE_INBOUND_RESET: return {
            ...state,
            delete: {
                isLoading: false,
                isSuccess: false,
                isReject: false,
                data: {},
            }
        }
        case  DELETE_INBOUND_LOADING: return {
            ...state,
            delete: {
                isLoading: true,
                isSuccess: false,
                isReject: false,
                data: {},
            }
        }
        case  DELETE_INBOUND_SUCCESS: return {
            ...state,
            delete: {
                isLoading: false,
                isSuccess: true,
                isReject: false,
                data: action.payload,
            }
        }
        case  DELETE_INBOUND_REJECT: return {
            ...state,
            delete: {
                isLoading: false,
                isSuccess: false,
                isReject: true,
                data: {},
            }
        }
        // ------------- OutboundDetail post --------------------
        case POST_INBOUND_DETAIL_RESET: return {
            ...state,
            postOutboundDetail: {
                isLoading: false,
                isSuccess: false,
                isReject: false,
                data: [],
            }
        }
        case POST_INBOUND_DETAIL_LOADING: return {
            ...state,
            postOutboundDetail: {
                isLoading: true,
                isSuccess: false,
                isReject: false,
                data: {},
            }
        }
        case POST_INBOUND_DETAIL_SUCCESS: return {
            ...state,
            postOutboundDetail: {
                isLoading: false,
                isSuccess: true,
                isReject: false,
                data: action.payload,
            }
        }
        case POST_INBOUND_DETAIL_REJECT: return {
            ...state,
            postOutboundDetail: {
                isLoading: false,
                isSuccess: false,
                isReject: true,
                data: {},
            }
        }

        // ------------- OutboundDetail put --------------------
        case PUT_INBOUND_DETAIL_RESET: return {
            ...state,
            putOutboundDetail: {
                isLoading: false,
                isSuccess: false,
                isReject: false,
                data: {},
            }
        }
        case PUT_INBOUND_DETAIL_LOADING: return {
            ...state,
            putOutboundDetail: {
                isLoading: true,
                isSuccess: false,
                isReject: false,
                data: {},
            }
        }
        case PUT_INBOUND_DETAIL_SUCCESS: return {
            ...state,
            putOutboundDetail: {
                isLoading: false,
                isSuccess: true,
                isReject: false,
                data: action.payload,
            }
        }
        case PUT_INBOUND_DETAIL_REJECT: return {
            ...state,
            putOutboundDetail: {
                isLoading: false,
                isSuccess: false,
                isReject: true,
                data: {},
            }
        }

        // ------------- OutboundDetail delete --------------------
        case DELETE_INBOUND_DETAIL_RESET: return {
            ...state,
            deleteOutboundDetail: {
                isLoading: false,
                isSuccess: false,
                isReject: false,
                data: {},
            }
        }
        case DELETE_INBOUND_DETAIL_LOADING: return {
            ...state,
            deleteOutboundDetail: {
                isLoading: true,
                isSuccess: false,
                isReject: false,
                data: {},
            }
        }
        case DELETE_INBOUND_DETAIL_SUCCESS: return {
            ...state,
            deleteOutboundDetail: {
                isLoading: false,
                isSuccess: true,
                isReject: false,
                data: action.payload,
            }
        }
        case DELETE_INBOUND_DETAIL_REJECT: return {
            ...state,
            deleteOutboundDetail: {
                isLoading: false,
                isSuccess: false,
                isReject: true,
                data: {},
            }
        }

        default: return state;
    }
}

export default OutboundReducer