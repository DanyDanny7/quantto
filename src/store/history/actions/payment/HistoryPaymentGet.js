import request, { Methods, withToken } from "../../../../assets/util/request";

//* ACTIONTYPES --------------------------------------------
export const GET_HISTORY_PAYMENT_LOADING = 'GET_HISTORY_PAYMENT_LOADING';
export const GET_HISTORY_PAYMENT_SUCCESS = 'GET_HISTORY_PAYMENT_SUCCESS';
export const GET_HISTORY_PAYMENT_REJECT = 'GET_HISTORY_PAYMENT_REJECT';

//* ACTIONS ------------------------------------------------
export const getHistoryPaymentLoading = () => ({ type: GET_HISTORY_PAYMENT_LOADING });
export const getHistoryPaymentSuccess = (payload) => ({ type: GET_HISTORY_PAYMENT_SUCCESS, payload });
export const getHistoryPaymentReject = (payload) => ({ type: GET_HISTORY_PAYMENT_REJECT, payload });

//* REQUEST SERVICE ---------------------------------------
export const getHistoryPaymentRequest = async (params = {}, getState) => {
    const options = await withToken({
        method: Methods.GET,
        params,
    }, getState);
    return request(`/api/web/getpaymenthistory`, options);
};


