import {
    GET_WAREHOUSE_LOADING,
    GET_WAREHOUSE_SUCCESS,
    GET_WAREHOUSE_REJECT,
} from "../../actions/warehouse/get";

import {
    GET_WAREHOUSE_ID_LOADING,
    GET_WAREHOUSE_ID_REJECT,
    GET_WAREHOUSE_ID_SUCCESS,
} from "../../actions/warehouse/getId";

import {
    DELETE_WAREHOUSE_LOADING,
    DELETE_WAREHOUSE_REJECT,
    DELETE_WAREHOUSE_SUCCESS,
    DELETE_WAREHOUSE_RESET,
} from "../../actions/warehouse/delete";

import {
    POST_WAREHOUSE_LOADING,
    POST_WAREHOUSE_REJECT,
    POST_WAREHOUSE_SUCCESS,
    POST_WAREHOUSE_RESET,
} from "../../actions/warehouse/post";

import {
    PUT_WAREHOUSE_LOADING,
    PUT_WAREHOUSE_REJECT,
    PUT_WAREHOUSE_SUCCESS,
    PUT_WAREHOUSE_RESET,
} from "../../actions/warehouse/put";

import {
    GET_LOCATION_LOADING,
    GET_LOCATION_SUCCESS,
    GET_LOCATION_REJECT,
} from "../../actions/location/get";

import {
    GET_LOCATION_ID_WAREHOUSE_LOADING,
    GET_LOCATION_ID_WAREHOUSE_REJECT,
    GET_LOCATION_ID_WAREHOUSE_SUCCESS,
} from "../../actions/location/getIdWarehouse";

import {
    DELETE_LOCATION_LOADING,
    DELETE_LOCATION_REJECT,
    DELETE_LOCATION_SUCCESS,
    DELETE_LOCATION_RESET,
} from "../../actions/location/delete";

import {
    POST_LOCATION_LOADING,
    POST_LOCATION_REJECT,
    POST_LOCATION_SUCCESS,
    POST_LOCATION_RESET,
} from "../../actions/location/post";

import {
    PUT_LOCATION_LOADING,
    PUT_LOCATION_REJECT,
    PUT_LOCATION_SUCCESS,
    PUT_LOCATION_RESET,
} from "../../actions/location/put";


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
    location: {
        isLoading: false,
        isSuccess: false,
        isReject: false,
        data: [],
    },
    detailLocation: {
        isLoading: false,
        isSuccess: false,
        isReject: false,
        data: [],
    },
    postLocation: {
        isLoading: false,
        isSuccess: false,
        isReject: false,
        data: {},
    },
    putLocation: {
        isLoading: false,
        isSuccess: false,
        isReject: false,
        data: {},
    },
    deleteLocation: {
        isLoading: false,
        isSuccess: false,
        isReject: false,
        data: {},
    },
}

const WarehouseReducer = (state = stateInit, action) => {
    switch (action.type) {
        // ------------- Warehouse --------------------
        case GET_WAREHOUSE_LOADING: return {
            ...state,
            isLoading: true,
            isSuccess: false,
            isReject: false,
            data: [],
        }
        case GET_WAREHOUSE_SUCCESS: return {
            ...state,
            isLoading: false,
            isSuccess: true,
            isReject: false,
            ...action.payload,
        }
        case GET_WAREHOUSE_REJECT: return {
            ...state,
            isLoading: false,
            isSuccess: false,
            isReject: true,
            data: [],
        }

        // ------------- Warehouse ID --------------------
        case GET_WAREHOUSE_ID_LOADING: return {
            ...state,
            detail: {
                isLoading: true,
                isSuccess: false,
                isReject: false,
                data: {},
            }
        }
        case GET_WAREHOUSE_ID_SUCCESS: return {
            ...state,
            detail: {
                isLoading: false,
                isSuccess: true,
                isReject: false,
                ...action.payload,
            }
        }
        case GET_WAREHOUSE_ID_REJECT: return {
            ...state,
            detail: {
                isLoading: false,
                isSuccess: false,
                isReject: true,
                data: {},
            }
        }

        // ------------- Warehouse post --------------------
        case POST_WAREHOUSE_RESET: return {
            ...state,
            post: {
                isLoading: false,
                isSuccess: false,
                isReject: false,
                data: {},
            }
        }
        case POST_WAREHOUSE_LOADING: return {
            ...state,
            post: {
                isLoading: true,
                isSuccess: false,
                isReject: false,
                data: {},
            }
        }
        case POST_WAREHOUSE_SUCCESS: return {
            ...state,
            post: {
                isLoading: false,
                isSuccess: true,
                isReject: false,
                data: action.payload,
            }
        }
        case POST_WAREHOUSE_REJECT: return {
            ...state,
            post: {
                isLoading: false,
                isSuccess: false,
                isReject: true,
                data: {},
            }
        }

        // ------------- Warehouse put --------------------
        case PUT_WAREHOUSE_RESET: return {
            ...state,
            put: {
                isLoading: false,
                isSuccess: false,
                isReject: false,
                data: {},
            }
        }
        case PUT_WAREHOUSE_LOADING: return {
            ...state,
            put: {
                isLoading: true,
                isSuccess: false,
                isReject: false,
                data: {},
            }
        }
        case PUT_WAREHOUSE_SUCCESS: return {
            ...state,
            put: {
                isLoading: false,
                isSuccess: true,
                isReject: false,
                data: action.payload,
            }
        }
        case PUT_WAREHOUSE_REJECT: return {
            ...state,
            put: {
                isLoading: false,
                isSuccess: false,
                isReject: true,
                data: {},
            }
        }

        // ------------- Warehouse delete --------------------
        case DELETE_LOCATION_RESET: return {
            ...state,
            delete: {
                isLoading: false,
                isSuccess: false,
                isReject: false,
                data: {},
            }
        }
        case DELETE_LOCATION_LOADING: return {
            ...state,
            delete: {
                isLoading: true,
                isSuccess: false,
                isReject: false,
                data: {},
            }
        }
        case DELETE_LOCATION_SUCCESS: return {
            ...state,
            delete: {
                isLoading: false,
                isSuccess: true,
                isReject: false,
                data: action.payload,
            }
        }
        case DELETE_LOCATION_REJECT: return {
            ...state,
            delete: {
                isLoading: false,
                isSuccess: false,
                isReject: true,
                data: {},
            }
        }

        // ------------- Warehouse Location --------------------
        case GET_LOCATION_LOADING: return {
            ...state,
            location: {
                isLoading: true,
                isSuccess: false,
                isReject: false,
                data: [],
            }
        }
        case GET_LOCATION_SUCCESS: return {
            ...state,
            location: {
                isLoading: false,
                isSuccess: true,
                isReject: false,
                ...action.payload,
            }
        }
        case GET_LOCATION_REJECT: return {
            ...state,
            location: {
                isLoading: false,
                isSuccess: false,
                isReject: true,
                data: [],
            }
        }

        // ------------- Warehouse Location ID --------------------
        case GET_LOCATION_ID_WAREHOUSE_LOADING: return {
            ...state,
            detailLocation: {
                isLoading: true,
                isSuccess: false,
                isReject: false,
                data: [],
            }
        }
        case GET_LOCATION_ID_WAREHOUSE_SUCCESS: return {
            ...state,
            detailLocation: {
                isLoading: false,
                isSuccess: true,
                isReject: false,
                ...action.payload,
            }
        }
        case GET_LOCATION_ID_WAREHOUSE_REJECT: return {
            ...state,
            detailLocation: {
                isLoading: false,
                isSuccess: false,
                isReject: true,
                data: [],
            }
        }

        // ------------- Warehouse Location post --------------------
        case POST_LOCATION_RESET: return {
            ...state,
            postLocation: {
                isLoading: false,
                isSuccess: false,
                isReject: false,
                data: [],
            }
        }
        case POST_LOCATION_LOADING: return {
            ...state,
            postLocation: {
                isLoading: true,
                isSuccess: false,
                isReject: false,
                data: {},
            }
        }
        case POST_LOCATION_SUCCESS: return {
            ...state,
            postLocation: {
                isLoading: false,
                isSuccess: true,
                isReject: false,
                data: action.payload,
            }
        }
        case POST_LOCATION_REJECT: return {
            ...state,
            postLocation: {
                isLoading: false,
                isSuccess: false,
                isReject: true,
                data: {},
            }
        }

        // ------------- Warehouse Location put --------------------
        case PUT_LOCATION_RESET: return {
            ...state,
            putLocation: {
                isLoading: false,
                isSuccess: false,
                isReject: false,
                data: {},
            }
        }
        case PUT_LOCATION_LOADING: return {
            ...state,
            putLocation: {
                isLoading: true,
                isSuccess: false,
                isReject: false,
                data: {},
            }
        }
        case PUT_LOCATION_SUCCESS: return {
            ...state,
            putLocation: {
                isLoading: false,
                isSuccess: true,
                isReject: false,
                data: action.payload,
            }
        }
        case PUT_LOCATION_REJECT: return {
            ...state,
            putLocation: {
                isLoading: false,
                isSuccess: false,
                isReject: true,
                data: {},
            }
        }

        // ------------- Warehouse Location delete --------------------
        case DELETE_LOCATION_RESET: return {
            ...state,
            deleteLocation: {
                isLoading: false,
                isSuccess: false,
                isReject: false,
                data: {},
            }
        }
        case DELETE_LOCATION_LOADING: return {
            ...state,
            deleteLocation: {
                isLoading: true,
                isSuccess: false,
                isReject: false,
                data: {},
            }
        }
        case DELETE_LOCATION_SUCCESS: return {
            ...state,
            deleteLocation: {
                isLoading: false,
                isSuccess: true,
                isReject: false,
                data: action.payload,
            }
        }
        case DELETE_LOCATION_REJECT: return {
            ...state,
            deleteLocation: {
                isLoading: false,
                isSuccess: false,
                isReject: true,
                data: {},
            }
        }

        default: return state;
    }
}

export default WarehouseReducer