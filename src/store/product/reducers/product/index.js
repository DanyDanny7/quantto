import {
    GET_LIST_PRODUCT_LOADING,
    GET_LIST_PRODUCT_SUCCESS,
    GET_LIST_PRODUCT_REJECT,
} from "../../actions/productlist/get";

import {
    GET_LIST_PRODUCT_ID_LOADING,
    GET_LIST_PRODUCT_ID_REJECT,
    GET_LIST_PRODUCT_ID_SUCCESS,
} from "../../actions/productlist/getId";

import {
    DELETE_LIST_PRODUCT_LOADING,
    DELETE_LIST_PRODUCT_REJECT,
    DELETE_LIST_PRODUCT_SUCCESS,
    DELETE_LIST_PRODUCT_RESET,
} from "../../actions/productlist/delete";

import {
    POST_LIST_PRODUCT_LOADING,
    POST_LIST_PRODUCT_REJECT,
    POST_LIST_PRODUCT_SUCCESS,
    POST_LIST_PRODUCT_RESET,
} from "../../actions/productlist/post";

import {
    PUT_LIST_PRODUCT_LOADING,
    PUT_LIST_PRODUCT_REJECT,
    PUT_LIST_PRODUCT_SUCCESS,
    PUT_LIST_PRODUCT_RESET,
} from "../../actions/productlist/put";

import {
    DELETE_UOM_PRODUCT_LOADING,
    DELETE_UOM_PRODUCT_REJECT,
    DELETE_UOM_PRODUCT_SUCCESS,
    DELETE_UOM_PRODUCT_RESET,
} from "../../actions/productuom/delete";

import {
    POST_UOM_PRODUCT_LOADING,
    POST_UOM_PRODUCT_REJECT,
    POST_UOM_PRODUCT_SUCCESS,
    POST_UOM_PRODUCT_RESET,
} from "../../actions/productuom/post";

import {
    PUT_UOM_PRODUCT_LOADING,
    PUT_UOM_PRODUCT_REJECT,
    PUT_UOM_PRODUCT_SUCCESS,
    PUT_UOM_PRODUCT_RESET,
} from "../../actions/productuom/put";

import {
    DELETE_IMG_PRODUCT_LOADING,
    DELETE_IMG_PRODUCT_REJECT,
    DELETE_IMG_PRODUCT_SUCCESS,
    DELETE_IMG_PRODUCT_RESET,
} from "../../actions/productimg/delete";

import {
    POST_IMG_PRODUCT_LOADING,
    POST_IMG_PRODUCT_REJECT,
    POST_IMG_PRODUCT_SUCCESS,
    POST_IMG_PRODUCT_RESET,
} from "../../actions/productimg/post";

import {
    GET_INVENTORY_PRODUCT_CLEAR,
    GET_INVENTORY_PRODUCT_LOADING,
    GET_INVENTORY_PRODUCT_SUCCESS,
    GET_INVENTORY_PRODUCT_REJECT,
} from "../../actions/productInventory/get";


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
    uomPost: {
        isLoading: false,
        isSuccess: false,
        isReject: false,
        data: {},
    },
    uomPut: {
        isLoading: false,
        isSuccess: false,
        isReject: false,
        data: {},
    },
    uomDelete: {
        isLoading: false,
        isSuccess: false,
        isReject: false,
        data: {},
    },
    imgDelete: {
        isLoading: false,
        isSuccess: false,
        isReject: false,
        data: {},
    },
    imgPost: {
        isLoading: false,
        isSuccess: false,
        isReject: false,
        data: {},
    },
    inventory: {
        isLoading: false,
        isSuccess: false,
        isReject: false,
        data: [],
    },
}

const ProductListReducer = (state = stateInit, action) => {
    switch (action.type) {
        // ------------- Product List --------------------
        case GET_LIST_PRODUCT_LOADING: return {
            ...state,
            isLoading: true,
            isSuccess: false,
            isReject: false,
            data: [],
        }
        case GET_LIST_PRODUCT_SUCCESS: return {
            ...state,
            isLoading: false,
            isSuccess: true,
            isReject: false,
            ...action.payload,
        }
        case GET_LIST_PRODUCT_REJECT: return {
            ...state,
            isLoading: false,
            isSuccess: false,
            isReject: true,
            data: [],
        }

        // ------------- Product List ID --------------------
        case GET_LIST_PRODUCT_ID_LOADING: return {
            ...state,
            detail: {
                isLoading: true,
                isSuccess: false,
                isReject: false,
                data: {},
            }
        }
        case GET_LIST_PRODUCT_ID_SUCCESS: return {
            ...state,
            detail: {
                isLoading: false,
                isSuccess: true,
                isReject: false,
                ...action.payload,
            }
        }
        case GET_LIST_PRODUCT_ID_REJECT: return {
            ...state,
            detail: {
                isLoading: false,
                isSuccess: false,
                isReject: true,
                data: {},
            }
        }

        // ------------- Product List post --------------------
        case POST_LIST_PRODUCT_RESET: return {
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
        case POST_LIST_PRODUCT_LOADING: return {
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
        case POST_LIST_PRODUCT_SUCCESS: return {
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
        case POST_LIST_PRODUCT_REJECT: return {
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
        case PUT_LIST_PRODUCT_RESET: return {
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
        case PUT_LIST_PRODUCT_LOADING: return {
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
        case PUT_LIST_PRODUCT_SUCCESS: return {
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
        case PUT_LIST_PRODUCT_REJECT: return {
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
        case DELETE_LIST_PRODUCT_RESET: return {
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
        case DELETE_LIST_PRODUCT_LOADING: return {
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
        case DELETE_LIST_PRODUCT_SUCCESS: return {
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
        case DELETE_LIST_PRODUCT_REJECT: return {
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
        // ------------- Product uom post --------------------
        case POST_UOM_PRODUCT_RESET: return {
            ...state,
            uomPost: {
                ...state.uomPost,
                delete: {
                    isLoading: false,
                    isSuccess: false,
                    isReject: false,
                    data: {},
                }
            }
        }
        case POST_UOM_PRODUCT_LOADING: return {
            ...state,
            uomPost: {
                ...state.uomPost,
                delete: {
                    isLoading: true,
                    isSuccess: false,
                    isReject: false,
                    data: {},
                }
            }
        }
        case POST_UOM_PRODUCT_SUCCESS: return {
            ...state,
            uomPost: {
                ...state.uomPost,
                delete: {
                    isLoading: false,
                    isSuccess: true,
                    isReject: false,
                    data: action.payload,
                }
            }
        }
        case POST_UOM_PRODUCT_REJECT: return {
            ...state,
            uomPost: {
                ...state.uomPost,
                delete: {
                    isLoading: false,
                    isSuccess: false,
                    isReject: true,
                    data: {},
                }
            }
        }

        // ------------- Product uom put --------------------
        case PUT_UOM_PRODUCT_RESET: return {
            ...state,
            uomPut: {
                ...state.uomPut,
                delete: {
                    isLoading: false,
                    isSuccess: false,
                    isReject: false,
                    data: {},
                }
            }
        }
        case PUT_UOM_PRODUCT_LOADING: return {
            ...state,
            uomPut: {
                ...state.uomPut,
                delete: {
                    isLoading: true,
                    isSuccess: false,
                    isReject: false,
                    data: {},
                }
            }
        }
        case PUT_UOM_PRODUCT_SUCCESS: return {
            ...state,
            uomPut: {
                ...state.uomPut,
                delete: {
                    isLoading: false,
                    isSuccess: true,
                    isReject: false,
                    data: action.payload,
                }
            }
        }
        case PUT_UOM_PRODUCT_REJECT: return {
            ...state,
            uomPut: {
                ...state.uomPut,
                delete: {
                    isLoading: false,
                    isSuccess: false,
                    isReject: true,
                    data: {},
                }
            }
        }

        // ------------- Product uom delete --------------------
        case DELETE_UOM_PRODUCT_RESET: return {
            ...state,
            uomDelete: {
                ...state.uomDelete,
                delete: {
                    isLoading: false,
                    isSuccess: false,
                    isReject: false,
                    data: {},
                }
            }
        }
        case DELETE_UOM_PRODUCT_LOADING: return {
            ...state,
            uomDelete: {
                ...state.uomDelete,
                delete: {
                    isLoading: true,
                    isSuccess: false,
                    isReject: false,
                    data: {},
                }
            }
        }
        case DELETE_UOM_PRODUCT_SUCCESS: return {
            ...state,
            uomDelete: {
                ...state.uomDelete,
                delete: {
                    isLoading: false,
                    isSuccess: true,
                    isReject: false,
                    data: action.payload,
                }
            }
        }
        case DELETE_UOM_PRODUCT_REJECT: return {
            ...state,
            uomDelete: {
                ...state.uomDelete,
                delete: {
                    isLoading: false,
                    isSuccess: false,
                    isReject: true,
                    data: {},
                }
            }
        }

        // ------------- Product img post --------------------
        case POST_IMG_PRODUCT_RESET: return {
            ...state,
            imgPost: {
                ...state.imgPost,
                delete: {
                    isLoading: false,
                    isSuccess: false,
                    isReject: false,
                    data: {},
                }
            }
        }
        case POST_IMG_PRODUCT_LOADING: return {
            ...state,
            imgPost: {
                ...state.imgPost,
                delete: {
                    isLoading: true,
                    isSuccess: false,
                    isReject: false,
                    data: {},
                }
            }
        }
        case POST_IMG_PRODUCT_SUCCESS: return {
            ...state,
            imgPost: {
                ...state.imgPost,
                delete: {
                    isLoading: false,
                    isSuccess: true,
                    isReject: false,
                    data: action.payload,
                }
            }
        }
        case POST_IMG_PRODUCT_REJECT: return {
            ...state,
            imgPost: {
                ...state.imgPost,
                delete: {
                    isLoading: false,
                    isSuccess: false,
                    isReject: true,
                    data: {},
                }
            }
        }

        // ------------- Product List delete --------------------
        case DELETE_IMG_PRODUCT_RESET: return {
            ...state,
            imgDelete: {
                ...state.imgDelete,
                delete: {
                    isLoading: false,
                    isSuccess: false,
                    isReject: false,
                    data: {},
                }
            }
        }
        case DELETE_IMG_PRODUCT_LOADING: return {
            ...state,
            imgDelete: {
                ...state.imgDelete,
                delete: {
                    isLoading: true,
                    isSuccess: false,
                    isReject: false,
                    data: {},
                }
            }
        }
        case DELETE_IMG_PRODUCT_SUCCESS: return {
            ...state,
            imgDelete: {
                ...state.imgDelete,
                delete: {
                    isLoading: false,
                    isSuccess: true,
                    isReject: false,
                    data: action.payload,
                }
            }
        }
        case DELETE_IMG_PRODUCT_REJECT: return {
            ...state,
            imgDelete: {
                ...state.imgDelete,
                delete: {
                    isLoading: false,
                    isSuccess: false,
                    isReject: true,
                    data: {},
                }
            }
        }

        // ------------- Product Inventory list --------------------
        case GET_INVENTORY_PRODUCT_CLEAR: return {
            ...state,
            inventory: {
                isLoading: false,
                isSuccess: false,
                isReject: false,
                data: [],
            }
        }
        case GET_INVENTORY_PRODUCT_LOADING: return {
            ...state,
            inventory: {
                isLoading: true,
                isSuccess: false,
                isReject: false,
                data: [],
            }
        }
        case GET_INVENTORY_PRODUCT_SUCCESS: return {
            ...state,
            inventory: {
                isLoading: false,
                isSuccess: true,
                isReject: false,
                ...action.payload,
            }
        }
        case GET_INVENTORY_PRODUCT_REJECT: return {
            ...state,
            inventory: {
                isLoading: false,
                isSuccess: false,
                isReject: true,
                data: [],
            }
        }


        default: return state;
    }
}

export default ProductListReducer