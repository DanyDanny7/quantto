import {
    GET_INBOUND_LOADING,
    GET_INBOUND_SUCCESS,
    GET_INBOUND_REJECT,
} from "../../actions/inbound/get";

import {
    GET_INBOUND_ID_LOADING,
    GET_INBOUND_ID_REJECT,
    GET_INBOUND_ID_SUCCESS,
} from "../../actions/inbound/getId";

import {
    GET_INBOUND_UOM_LOADING,
    GET_INBOUND_UOM_REJECT,
    GET_INBOUND_UOM_SUCCESS,
} from "../../actions/inbound/getUom";

import {
    DELETE_INBOUND_LOADING,
    DELETE_INBOUND_REJECT,
    DELETE_INBOUND_SUCCESS,
    DELETE_INBOUND_RESET,
} from "../../actions/inbound/delete";

import {
    POST_INBOUND_LOADING,
    POST_INBOUND_REJECT,
    POST_INBOUND_SUCCESS,
    POST_INBOUND_RESET,
} from "../../actions/inbound/post";

import {
    PUT_INBOUND_LOADING,
    PUT_INBOUND_REJECT,
    PUT_INBOUND_SUCCESS,
    PUT_INBOUND_RESET,
} from "../../actions/inbound/put";

import {
    DELETE_INBOUND_DETAIL_LOADING,
    DELETE_INBOUND_DETAIL_REJECT,
    DELETE_INBOUND_DETAIL_SUCCESS,
    DELETE_INBOUND_DETAIL_RESET,
} from "../../actions/inboundDetail/delete";

import {
    POST_INBOUND_DETAIL_LOADING,
    POST_INBOUND_DETAIL_REJECT,
    POST_INBOUND_DETAIL_SUCCESS,
    POST_INBOUND_DETAIL_RESET,
} from "../../actions/inboundDetail/post";

import {
    PUT_INBOUND_DETAIL_LOADING,
    PUT_INBOUND_DETAIL_REJECT,
    PUT_INBOUND_DETAIL_SUCCESS,
    PUT_INBOUND_DETAIL_RESET,
} from "../../actions/inboundDetail/put";


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
    uom: {
        isLoading: false,
        isSuccess: false,
        isReject: false,
        data: [],
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
    inboundDetail: {
        isLoading: false,
        isSuccess: false,
        isReject: false,
        data: [],
    },
    postInboundDetail: {
        isLoading: false,
        isSuccess: false,
        isReject: false,
        data: {},
    },
    putInboundDetail: {
        isLoading: false,
        isSuccess: false,
        isReject: false,
        data: {},
    },
    deleteInboundDetail: {
        isLoading: false,
        isSuccess: false,
        isReject: false,
        data: {},
    },
}

const InboundReducer = (state = stateInit, action) => {
    switch (action.type) {
        // ------------- Inbound --------------------
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

        // ------------- Inbound ID --------------------
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
        // ------------- Inbound uom --------------------
        case GET_INBOUND_UOM_LOADING: return {
            ...state,
            uom: {
                isLoading: true,
                isSuccess: false,
                isReject: false,
                data: [],
            }
        }
        case GET_INBOUND_UOM_SUCCESS: return {
            ...state,
            uom: {
                isLoading: false,
                isSuccess: true,
                isReject: false,
                ...action.payload,
            }
        }
        case GET_INBOUND_UOM_REJECT: return {
            ...state,
            uom: {
                isLoading: false,
                isSuccess: false,
                isReject: true,
                data: [],
            }
        }

        // ------------- Inbound post --------------------
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

        // ------------- Inbound put --------------------
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

        // ------------- Inbound delete --------------------
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
        // ------------- InboundDetail post --------------------
        case POST_INBOUND_DETAIL_RESET: return {
            ...state,
            postInboundDetail: {
                isLoading: false,
                isSuccess: false,
                isReject: false,
                data: [],
            }
        }
        case POST_INBOUND_DETAIL_LOADING: return {
            ...state,
            postInboundDetail: {
                isLoading: true,
                isSuccess: false,
                isReject: false,
                data: {},
            }
        }
        case POST_INBOUND_DETAIL_SUCCESS: return {
            ...state,
            postInboundDetail: {
                isLoading: false,
                isSuccess: true,
                isReject: false,
                data: action.payload,
            }
        }
        case POST_INBOUND_DETAIL_REJECT: return {
            ...state,
            postInboundDetail: {
                isLoading: false,
                isSuccess: false,
                isReject: true,
                data: {},
            }
        }

        // ------------- InboundDetail put --------------------
        case PUT_INBOUND_DETAIL_RESET: return {
            ...state,
            putInboundDetail: {
                isLoading: false,
                isSuccess: false,
                isReject: false,
                data: {},
            }
        }
        case PUT_INBOUND_DETAIL_LOADING: return {
            ...state,
            putInboundDetail: {
                isLoading: true,
                isSuccess: false,
                isReject: false,
                data: {},
            }
        }
        case PUT_INBOUND_DETAIL_SUCCESS: return {
            ...state,
            putInboundDetail: {
                isLoading: false,
                isSuccess: true,
                isReject: false,
                data: action.payload,
            }
        }
        case PUT_INBOUND_DETAIL_REJECT: return {
            ...state,
            putInboundDetail: {
                isLoading: false,
                isSuccess: false,
                isReject: true,
                data: {},
            }
        }

        // ------------- InboundDetail delete --------------------
        case DELETE_INBOUND_DETAIL_RESET: return {
            ...state,
            deleteInboundDetail: {
                isLoading: false,
                isSuccess: false,
                isReject: false,
                data: {},
            }
        }
        case DELETE_INBOUND_DETAIL_LOADING: return {
            ...state,
            deleteInboundDetail: {
                isLoading: true,
                isSuccess: false,
                isReject: false,
                data: {},
            }
        }
        case DELETE_INBOUND_DETAIL_SUCCESS: return {
            ...state,
            deleteInboundDetail: {
                isLoading: false,
                isSuccess: true,
                isReject: false,
                data: action.payload,
            }
        }
        case DELETE_INBOUND_DETAIL_REJECT: return {
            ...state,
            deleteInboundDetail: {
                isLoading: false,
                isSuccess: false,
                isReject: true,
                data: {},
            }
        }

        default: return state;
    }
}

export default InboundReducer