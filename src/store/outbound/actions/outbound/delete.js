import request, { Methods, withToken } from "../../../../assets/util/request";

//* ACTIONTYPES --------------------------------------------
export const DELETE_INBOUND_RESET = 'DELETE_INBOUND_RESET';
export const DELETE_INBOUND_LOADING = 'DELETE_INBOUND_LOADING';
export const DELETE_INBOUND_SUCCESS = 'DELETE_INBOUND_SUCCESS';
export const DELETE_INBOUND_REJECT = 'DELETE_INBOUND_REJECT';

//* ACTIONS ------------------------------------------------
export const deleteOutboundReset = () => ({ type: DELETE_INBOUND_RESET });
export const deleteOutboundLoading = () => ({ type: DELETE_INBOUND_LOADING });
export const deleteOutboundSuccess = (payload) => ({ type: DELETE_INBOUND_SUCCESS, payload });
export const deleteOutboundReject = (payload) => ({ type: DELETE_INBOUND_REJECT, payload });

//* REQUEST SERVICE ---------------------------------------
export const deleteOutboundRequest = async (data, getState) => {
    const options = await withToken({
        method: Methods.DELETE,
        data,
    }, getState);
    return request(`/api/web/deleteoutbound`, options);
};

