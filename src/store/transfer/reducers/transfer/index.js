import {
    GET_TRANSFER_LOADING,
    GET_TRANSFER_SUCCESS,
    GET_TRANSFER_REJECT,
} from "../../actions/transfer/get";

import {
    GET_TRANSFER_ID_LOADING,
    GET_TRANSFER_ID_REJECT,
    GET_TRANSFER_ID_SUCCESS,
} from "../../actions/transfer/getId";

import {
    DELETE_TRANSFER_LOADING,
    DELETE_TRANSFER_REJECT,
    DELETE_TRANSFER_SUCCESS,
    DELETE_TRANSFER_RESET,
} from "../../actions/transfer/delete";

import {
    POST_TRANSFER_LOADING,
    POST_TRANSFER_REJECT,
    POST_TRANSFER_SUCCESS,
    POST_TRANSFER_RESET,
} from "../../actions/transfer/post";

import {
    PUT_TRANSFER_LOADING,
    PUT_TRANSFER_REJECT,
    PUT_TRANSFER_SUCCESS,
    PUT_TRANSFER_RESET,
} from "../../actions/transfer/put";

import {
    DELETE_TRANSFER_DETAIL_LOADING,
    DELETE_TRANSFER_DETAIL_REJECT,
    DELETE_TRANSFER_DETAIL_SUCCESS,
    DELETE_TRANSFER_DETAIL_RESET,
} from "../../actions/detail/delete";

import {
    POST_TRANSFER_DETAIL_LOADING,
    POST_TRANSFER_DETAIL_REJECT,
    POST_TRANSFER_DETAIL_SUCCESS,
    POST_TRANSFER_DETAIL_RESET,
} from "../../actions/detail/post";

import {
    PUT_TRANSFER_DETAIL_LOADING,
    PUT_TRANSFER_DETAIL_REJECT,
    PUT_TRANSFER_DETAIL_SUCCESS,
    PUT_TRANSFER_DETAIL_RESET,
} from "../../actions/detail/put";


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
    listPost: {
        isLoading: false,
        isSuccess: false,
        isReject: false,
        data: {},
    },
    listPut: {
        isLoading: false,
        isSuccess: false,
        isReject: false,
        data: {},
    },
    listDelete: {
        isLoading: false,
        isSuccess: false,
        isReject: false,
        data: {},
    },
    detailPost: {
        isLoading: false,
        isSuccess: false,
        isReject: false,
        data: {},
    },
    detailPut: {
        isLoading: false,
        isSuccess: false,
        isReject: false,
        data: {},
    },
    detailDelete: {
        isLoading: false,
        isSuccess: false,
        isReject: false,
        data: {},
    },
}

const ProductListReducer = (state = stateInit, action) => {
    switch (action.type) {
        // ------------- Product List --------------------
        case GET_TRANSFER_LOADING: return {
            ...state,
            isLoading: true,
            isSuccess: false,
            isReject: false,
            data: [],
        }
        case GET_TRANSFER_SUCCESS: return {
            ...state,
            isLoading: false,
            isSuccess: true,
            isReject: false,
            ...action.payload,
        }
        case GET_TRANSFER_REJECT: return {
            ...state,
            isLoading: false,
            isSuccess: false,
            isReject: true,
            data: [],
        }

        // ------------- Product List ID --------------------
        case GET_TRANSFER_ID_LOADING: return {
            ...state,
            detail: {
                isLoading: true,
                isSuccess: false,
                isReject: false,
                data: {},
            }
        }
        case GET_TRANSFER_ID_SUCCESS: return {
            ...state,
            detail: {
                isLoading: false,
                isSuccess: true,
                isReject: false,
                ...action.payload,
            }
        }
        case GET_TRANSFER_ID_REJECT: return {
            ...state,
            detail: {
                isLoading: false,
                isSuccess: false,
                isReject: true,
                data: {},
            }
        }

        // ------------- Product List post --------------------
        case POST_TRANSFER_RESET: return {
            ...state,
            listPost: {
                ...state.listPost,
                delete: {
                    isLoading: false,
                    isSuccess: false,
                    isReject: false,
                    data: {},
                }
            }
        }
        case POST_TRANSFER_LOADING: return {
            ...state,
            listPost: {
                ...state.listPost,
                delete: {
                    isLoading: true,
                    isSuccess: false,
                    isReject: false,
                    data: {},
                }
            }
        }
        case POST_TRANSFER_SUCCESS: return {
            ...state,
            listPost: {
                ...state.listPost,
                delete: {
                    isLoading: false,
                    isSuccess: true,
                    isReject: false,
                    data: action.payload,
                }
            }
        }
        case POST_TRANSFER_REJECT: return {
            ...state,
            listPost: {
                ...state.listPost,
                delete: {
                    isLoading: false,
                    isSuccess: false,
                    isReject: true,
                    data: {},
                }
            }
        }

        // ------------- Product List put --------------------
        case PUT_TRANSFER_RESET: return {
            ...state,
            listPut: {
                ...state.listPut,
                delete: {
                    isLoading: false,
                    isSuccess: false,
                    isReject: false,
                    data: {},
                }
            }
        }
        case PUT_TRANSFER_LOADING: return {
            ...state,
            listPut: {
                ...state.listPut,
                delete: {
                    isLoading: true,
                    isSuccess: false,
                    isReject: false,
                    data: {},
                }
            }
        }
        case PUT_TRANSFER_SUCCESS: return {
            ...state,
            listPut: {
                ...state.listPut,
                delete: {
                    isLoading: false,
                    isSuccess: true,
                    isReject: false,
                    data: action.payload,
                }
            }
        }
        case PUT_TRANSFER_REJECT: return {
            ...state,
            listPut: {
                ...state.listPut,
                delete: {
                    isLoading: false,
                    isSuccess: false,
                    isReject: true,
                    data: {},
                }
            }
        }

        // ------------- Product List delete --------------------
        case DELETE_TRANSFER_RESET: return {
            ...state,
            listDelete: {
                ...state.listDelete,
                delete: {
                    isLoading: false,
                    isSuccess: false,
                    isReject: false,
                    data: {},
                }
            }
        }
        case DELETE_TRANSFER_LOADING: return {
            ...state,
            listDelete: {
                ...state.listDelete,
                delete: {
                    isLoading: true,
                    isSuccess: false,
                    isReject: false,
                    data: {},
                }
            }
        }
        case DELETE_TRANSFER_SUCCESS: return {
            ...state,
            listDelete: {
                ...state.listDelete,
                delete: {
                    isLoading: false,
                    isSuccess: true,
                    isReject: false,
                    data: action.payload,
                }
            }
        }
        case DELETE_TRANSFER_REJECT: return {
            ...state,
            listDelete: {
                ...state.listDelete,
                delete: {
                    isLoading: false,
                    isSuccess: false,
                    isReject: true,
                    data: {},
                }
            }
        }
        // ------------- Product detail post --------------------
        case POST_TRANSFER_DETAIL_RESET: return {
            ...state,
            detailPost: {
                ...state.detailPost,
                delete: {
                    isLoading: false,
                    isSuccess: false,
                    isReject: false,
                    data: {},
                }
            }
        }
        case POST_TRANSFER_DETAIL_LOADING: return {
            ...state,
            detailPost: {
                ...state.detailPost,
                delete: {
                    isLoading: true,
                    isSuccess: false,
                    isReject: false,
                    data: {},
                }
            }
        }
        case POST_TRANSFER_DETAIL_SUCCESS: return {
            ...state,
            detailPost: {
                ...state.detailPost,
                delete: {
                    isLoading: false,
                    isSuccess: true,
                    isReject: false,
                    data: action.payload,
                }
            }
        }
        case POST_TRANSFER_DETAIL_REJECT: return {
            ...state,
            detailPost: {
                ...state.detailPost,
                delete: {
                    isLoading: false,
                    isSuccess: false,
                    isReject: true,
                    data: {},
                }
            }
        }

        // ------------- Product detail put --------------------
        case PUT_TRANSFER_DETAIL_RESET: return {
            ...state,
            detailPut: {
                ...state.detailPut,
                delete: {
                    isLoading: false,
                    isSuccess: false,
                    isReject: false,
                    data: {},
                }
            }
        }
        case PUT_TRANSFER_DETAIL_LOADING: return {
            ...state,
            detailPut: {
                ...state.detailPut,
                delete: {
                    isLoading: true,
                    isSuccess: false,
                    isReject: false,
                    data: {},
                }
            }
        }
        case PUT_TRANSFER_DETAIL_SUCCESS: return {
            ...state,
            detailPut: {
                ...state.detailPut,
                delete: {
                    isLoading: false,
                    isSuccess: true,
                    isReject: false,
                    data: action.payload,
                }
            }
        }
        case PUT_TRANSFER_DETAIL_REJECT: return {
            ...state,
            detailPut: {
                ...state.detailPut,
                delete: {
                    isLoading: false,
                    isSuccess: false,
                    isReject: true,
                    data: {},
                }
            }
        }

        // ------------- Product detail delete --------------------
        case DELETE_TRANSFER_DETAIL_RESET: return {
            ...state,
            detailDelete: {
                ...state.detailDelete,
                delete: {
                    isLoading: false,
                    isSuccess: false,
                    isReject: false,
                    data: {},
                }
            }
        }
        case DELETE_TRANSFER_DETAIL_LOADING: return {
            ...state,
            detailDelete: {
                ...state.detailDelete,
                delete: {
                    isLoading: true,
                    isSuccess: false,
                    isReject: false,
                    data: {},
                }
            }
        }
        case DELETE_TRANSFER_DETAIL_SUCCESS: return {
            ...state,
            detailDelete: {
                ...state.detailDelete,
                delete: {
                    isLoading: false,
                    isSuccess: true,
                    isReject: false,
                    data: action.payload,
                }
            }
        }
        case DELETE_TRANSFER_DETAIL_REJECT: return {
            ...state,
            detailDelete: {
                ...state.detailDelete,
                delete: {
                    isLoading: false,
                    isSuccess: false,
                    isReject: true,
                    data: {},
                }
            }
        }

        default: return state;
    }
}

export default ProductListReducer