import request, { Methods, withToken } from "../../../../assets/util/request";

//* ACTIONTYPES --------------------------------------------
export const PUT_CLOSE_INBOUND_RESET = 'PUT_CLOSE_INBOUND_RESET';
export const PUT_CLOSE_INBOUND_LOADING = 'PUT_CLOSE_INBOUND_LOADING';
export const PUT_CLOSE_INBOUND_SUCCESS = 'PUT_CLOSE_INBOUND_SUCCESS';
export const PUT_CLOSE_INBOUND_REJECT = 'PUT_CLOSE_INBOUND_REJECT';

//* ACTIONS ------------------------------------------------
export const putCloseInboundReset = () => ({ type: PUT_CLOSE_INBOUND_RESET });
export const putCloseInboundLoading = () => ({ type: PUT_CLOSE_INBOUND_LOADING });
export const putCloseInboundSuccess = (payload) => ({ type: PUT_CLOSE_INBOUND_SUCCESS, payload });
export const putCloseInboundReject = (payload) => ({ type: PUT_CLOSE_INBOUND_REJECT, payload });

//* REQUEST SERVICE ---------------------------------------
export const putCloseInboundRequest = async (data, getState) => {
    const options = await withToken({
        method: Methods.PUT,
        data,
    }, getState);
    return request(`/api/web/inboundclose`, options);
};

