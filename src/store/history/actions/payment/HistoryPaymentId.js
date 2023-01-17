import request, { Methods, withToken } from "../../../../assets/util/request";

//* ACTIONTYPES --------------------------------------------
export const GET_HISTORY_PAYMENT_ID_LOADING = 'GET_HISTORY_PAYMENT_ID_LOADING';
export const GET_HISTORY_PAYMENT_ID_SUCCESS = 'GET_HISTORY_PAYMENT_ID_SUCCESS';
export const GET_HISTORY_PAYMENT_ID_REJECT = 'GET_HISTORY_PAYMENT_ID_REJECT';

//* ACTIONS ------------------------------------------------
export const getHistoryPaymentIdLoading = () => ({ type: GET_HISTORY_PAYMENT_ID_LOADING });
export const getHistoryPaymentIdSuccess = (payload) => ({ type: GET_HISTORY_PAYMENT_ID_SUCCESS, payload });
export const getHistoryPaymentIdReject = (payload) => ({ type: GET_HISTORY_PAYMENT_ID_REJECT, payload });

//* REQUEST SERVICE ---------------------------------------
export const getHistoryPaymentIdRequest = async (params = {}, getState) => {
    const options = await withToken({
        method: Methods.GET,
        params,
    }, getState);
    return request(`/api/web/getpaymentbyid`, options);
};


