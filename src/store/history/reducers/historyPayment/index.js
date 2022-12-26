import {
    GET_HISTORY_PAYMENT_LOADING,
    GET_HISTORY_PAYMENT_SUCCESS,
    GET_HISTORY_PAYMENT_REJECT,
} from "../../actions/payment/HistoryPaymentGet";

const stateInit = {
    isLoading: false,
    isSuccess: false,
    isReject: false,
    data: [],
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

        default: return state;
    }
}

export default HistoryPaymentReducer