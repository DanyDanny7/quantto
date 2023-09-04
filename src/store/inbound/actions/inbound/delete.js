import request, { Methods, withToken } from "../../../../assets/util/request";

//* ACTIONTYPES --------------------------------------------
export const DELETE_INBOUND_RESET = 'DELETE_INBOUND_RESET';
export const DELETE_INBOUND_LOADING = 'DELETE_INBOUND_LOADING';
export const DELETE_INBOUND_SUCCESS = 'DELETE_INBOUND_SUCCESS';
export const DELETE_INBOUND_REJECT = 'DELETE_INBOUND_REJECT';

//* ACTIONS ------------------------------------------------
export const deleteInboundReset = () => ({ type: DELETE_INBOUND_RESET });
export const deleteInboundLoading = () => ({ type: DELETE_INBOUND_LOADING });
export const deleteInboundSuccess = (payload) => ({ type: DELETE_INBOUND_SUCCESS, payload });
export const deleteInboundReject = (payload) => ({ type: DELETE_INBOUND_REJECT, payload });

//* REQUEST SERVICE ---------------------------------------
export const deleteInboundRequest = async (data, getState) => {
    const options = await withToken({
        method: Methods.DELETE,
        data,
    }, getState);
    return request(`/api/web/deleteinbound`, options);
};

