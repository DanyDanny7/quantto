import request, { Methods, withToken } from "../../../../assets/util/request";

//* ACTIONTYPES --------------------------------------------
export const POST_INBOUND_RESET = 'POST_INBOUND_RESET';
export const POST_INBOUND_LOADING = 'POST_INBOUND_LOADING';
export const POST_INBOUND_SUCCESS = 'POST_INBOUND_SUCCESS';
export const POST_INBOUND_REJECT = 'POST_INBOUND_REJECT';

//* ACTIONS ------------------------------------------------
export const postInboundReset = () => ({ type: POST_INBOUND_RESET });
export const postInboundLoading = () => ({ type: POST_INBOUND_LOADING });
export const postInboundSuccess = (payload) => ({ type: POST_INBOUND_SUCCESS, payload });
export const postInboundReject = (payload) => ({ type: POST_INBOUND_REJECT, payload });

//* REQUEST SERVICE ---------------------------------------
export const postInboundRequest = async (data, getState) => {
    const options = await withToken({
        method: Methods.POST,
        data,
    }, getState);
    return request(`/api/web/addinbound`, options);
};
