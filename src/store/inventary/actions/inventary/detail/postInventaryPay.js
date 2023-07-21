import request, { Methods, withToken } from "../../../../../assets/util/request";

//* ACTIONTYPES --------------------------------------------
export const POST_INVENTARY_PAY_RESET = 'POST_INVENTARY_PAY_RESET';
export const POST_INVENTARY_PAY_LOADING = 'POST_INVENTARY_PAY_LOADING';
export const POST_INVENTARY_PAY_SUCCESS = 'POST_INVENTARY_PAY_SUCCESS';
export const POST_INVENTARY_PAY_REJECT = 'POST_INVENTARY_PAY_REJECT';

//* ACTIONS ------------------------------------------------
export const postInventaryPayReset = () => ({ type: POST_INVENTARY_PAY_RESET });
export const postInventaryPayLoading = () => ({ type: POST_INVENTARY_PAY_LOADING });
export const postInventaryPaySuccess = (payload) => ({ type: POST_INVENTARY_PAY_SUCCESS, payload });
export const postInventaryPayReject = (payload) => ({ type: POST_INVENTARY_PAY_REJECT, payload });

//* REQUEST SERVICE ---------------------------------------
export const postInventaryPayRequest = async (data, getState) => {
    const options = await withToken({
        method: Methods.POST,
        data,
    }, getState);
    return request(`/api/web/addinventoryPayment`, options);
};


