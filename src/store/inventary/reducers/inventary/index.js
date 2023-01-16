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
    PUT_INVENTARY_RECOUNT_RESET,
    PUT_INVENTARY_RECOUNT_LOADING,
    PUT_INVENTARY_RECOUNT_SUCCESS,
    PUT_INVENTARY_RECOUNT_REJECT,
} from "../../actions/inventary/counts/putReCounts";

import {
    DELETE_INVENTARY_COUNT_RESET,
    DELETE_INVENTARY_COUNT_LOADING,
    DELETE_INVENTARY_COUNT_SUCCESS,
    DELETE_INVENTARY_COUNT_REJECT,
} from "../../actions/inventary/counts/deleteCounts";

import {
    GET_INVENTARY_DETAIL_LOADING,
    GET_INVENTARY_DETAIL_SUCCESS,
    GET_INVENTARY_DETAIL_REJECT,
} from "../../actions/inventary/detail/getDetail";

import {
    POST_INVENTARY_RESET,
    POST_INVENTARY_LOADING,
    POST_INVENTARY_SUCCESS,
    POST_INVENTARY_REJECT,
} from "../../actions/inventary/postInventary";

import {
    GET_INVENTARY_DETAIL_PAYING_LOADING,
    GET_INVENTARY_DETAIL_PAYING_SUCCESS,
    GET_INVENTARY_DETAIL_PAYING_REJECT,
} from "../../actions/inventary/detail/getDetailPaying";


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
        recount: {
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
    },
    detail: {
        isLoading: false,
        isSuccess: false,
        isReject: false,
        data: {},
    },
    paying: {
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

        // ------------- Inventary Counts delete --------------------
        case DELETE_INVENTARY_COUNT_RESET: return {
            ...state,
            counts: {
                ...state.counts,
                delete: {
                    isLoading: false,
                    isSuccess: false,
                    isReject: false,
                    data: {},
                }
            }
        }
        case DELETE_INVENTARY_COUNT_LOADING: return {
            ...state,
            counts: {
                ...state.counts,
                delete: {
                    isLoading: true,
                    isSuccess: false,
                    isReject: false,
                    data: {},
                }
            }
        }
        case DELETE_INVENTARY_COUNT_SUCCESS: return {
            ...state,
            counts: {
                ...state.counts,
                delete: {
                    isLoading: false,
                    isSuccess: true,
                    isReject: false,
                    data: action.payload,
                }
            }
        }
        case DELETE_INVENTARY_COUNT_REJECT: return {
            ...state,
            counts: {
                ...state.counts,
                delete: {
                    isLoading: false,
                    isSuccess: false,
                    isReject: true,
                    data: {},
                }
            }
        }

        // ------------- Inventary Counts recount --------------------
        case PUT_INVENTARY_RECOUNT_RESET: return {
            ...state,
            counts: {
                ...state.counts,
                recount: {
                    isLoading: false,
                    isSuccess: false,
                    isReject: false,
                    data: {},
                }
            }
        }
        case PUT_INVENTARY_RECOUNT_LOADING: return {
            ...state,
            counts: {
                ...state.counts,
                recount: {
                    isLoading: true,
                    isSuccess: false,
                    isReject: false,
                    data: {},
                }
            }
        }
        case PUT_INVENTARY_RECOUNT_SUCCESS: return {
            ...state,
            counts: {
                ...state.counts,
                recount: {
                    isLoading: false,
                    isSuccess: true,
                    isReject: false,
                    data: action.payload,
                }
            }
        }
        case PUT_INVENTARY_RECOUNT_REJECT: return {
            ...state,
            counts: {
                ...state.counts,
                recount: {
                    isLoading: false,
                    isSuccess: false,
                    isReject: true,
                    data: {},
                }
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

        // ------------- Inventary Detail Paying --------------------
        case GET_INVENTARY_DETAIL_PAYING_LOADING: return {
            ...state,
            paying: {
                ...state.paying,
                isLoading: true,
                isSuccess: false,
                isReject: false,
                data: [],
            }
        }
        case GET_INVENTARY_DETAIL_PAYING_SUCCESS: return {
            ...state,
            paying: {
                ...state.paying,
                isLoading: false,
                isSuccess: true,
                isReject: false,
                data: action.payload,
            }
        }
        case GET_INVENTARY_DETAIL_PAYING_REJECT: return {
            ...state,
            paying: {
                ...state.paying,
                isLoading: false,
                isSuccess: false,
                isReject: true,
                data: [],
            }
        }

        // ------------- Inventary POST --------------------
        case POST_INVENTARY_RESET: return {
            ...state,
            post: {
                isLoading: false,
                isSuccess: false,
                isReject: false,
                data: {},
            }
        }
        case POST_INVENTARY_LOADING: return {
            ...state,
            post: {
                isLoading: true,
                isSuccess: false,
                isReject: false,
                data: {},
            }
        }
        case POST_INVENTARY_SUCCESS: return {
            ...state,
            post: {
                isLoading: false,
                isSuccess: true,
                isReject: false,
                data: action.payload,
            }
        }
        case POST_INVENTARY_REJECT: return {
            ...state,
            post: {
                isLoading: false,
                isSuccess: false,
                isReject: true,
                data: {},
            }
        }

        default: return state;
    }
}

export default inventaryReducer