import request, { Methods, withToken } from "../../../../assets/util/request";

//* ACTIONTYPES --------------------------------------------
export const PUT_INBOUND_RESET = 'PUT_INBOUND_RESET';
export const PUT_INBOUND_LOADING = 'PUT_INBOUND_LOADING';
export const PUT_INBOUND_SUCCESS = 'PUT_INBOUND_SUCCESS';
export const PUT_INBOUND_REJECT = 'PUT_INBOUND_REJECT';

//* ACTIONS ------------------------------------------------
export const putOutboundReset = () => ({ type: PUT_INBOUND_RESET });
export const putOutboundLoading = () => ({ type: PUT_INBOUND_LOADING });
export const putOutboundSuccess = (payload) => ({ type: PUT_INBOUND_SUCCESS, payload });
export const putOutboundReject = (payload) => ({ type: PUT_INBOUND_REJECT, payload });

//* REQUEST SERVICE ---------------------------------------
export const putOutboundRequest = async (data, getState) => {
    const options = await withToken({
        method: Methods.PUT,
        data,
    }, getState);
    return request(`/api/web/updateoutbound`, options);
};

