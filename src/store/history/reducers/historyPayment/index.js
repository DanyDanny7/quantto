import {
    GET_HISTORY_PAYMENT_LOADING,
    GET_HISTORY_PAYMENT_SUCCESS,
    GET_HISTORY_PAYMENT_REJECT,
} from "../../actions/payment/HistoryPaymentGet";

import {
    GET_HISTORY_PAYMENT_ID_LOADING,
    GET_HISTORY_PAYMENT_ID_SUCCESS,
    GET_HISTORY_PAYMENT_ID_REJECT,
} from "../../actions/payment/HistoryPaymentId";

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
    }
}

const HistoryPaymentReducer = (state = stateInit, action) => {
    switch (action.type) {
        // ------------- History Payment --------------------
        case GET_HISTORY_PAYMENT_LOADING: return {
            ...state,
            isLoading: true,
            isSuccess: false,
            isReject: false,
            data: [],
        }
        case GET_HISTORY_PAYMENT_SUCCESS: return {
            ...state,
            isLoading: false,
            isSuccess: true,
            isReject: false,
            ...action.payload,
        }
        case GET_HISTORY_PAYMENT_REJECT: return {
            ...state,
            isLoading: false,
            isSuccess: false,
            isReject: true,
            data: [],
        }

        // ------------- History Payment ID --------------------
        case GET_HISTORY_PAYMENT_ID_LOADING: return {
            ...state,
            detail: {
                isLoading: true,
                isSuccess: false,
                isReject: false,
                data: {},
            }
        }
        case GET_HISTORY_PAYMENT_ID_SUCCESS: return {
            ...state,
            detail: {
                isLoading: false,
                isSuccess: true,
                isReject: false,
                ...action.payload,
            }
        }
        case GET_HISTORY_PAYMENT_ID_REJECT: return {
            ...state,
            detail: {
                isLoading: false,
                isSuccess: false,
                isReject: true,
                data: {},
            }
        }

        default: return state;
    }
}

export default HistoryPaymentReducer