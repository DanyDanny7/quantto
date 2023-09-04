import request, { Methods, withToken } from "../../../../assets/util/request";

//* ACTIONTYPES --------------------------------------------
export const DELETE_INBOUND_DETAIL_RESET = 'DELETE_INBOUND_DETAIL_RESET';
export const DELETE_INBOUND_DETAIL_LOADING = 'DELETE_INBOUND_DETAIL_LOADING';
export const DELETE_INBOUND_DETAIL_SUCCESS = 'DELETE_INBOUND_DETAIL_SUCCESS';
export const DELETE_INBOUND_DETAIL_REJECT = 'DELETE_INBOUND_DETAIL_REJECT';

//* ACTIONS ------------------------------------------------
export const deleteOutboundDetailReset = () => ({ type: DELETE_INBOUND_DETAIL_RESET });
export const deleteOutboundDetailLoading = () => ({ type: DELETE_INBOUND_DETAIL_LOADING });
export const deleteOutboundDetailSuccess = (payload) => ({ type: DELETE_INBOUND_DETAIL_SUCCESS, payload });
export const deleteOutboundDetailReject = (payload) => ({ type: DELETE_INBOUND_DETAIL_REJECT, payload });

//* REQUEST SERVICE ---------------------------------------
export const deleteOutboundDetailRequest = async (data, getState) => {
    const options = await withToken({
        method: Methods.DELETE,
        data,
    }, getState);
    return request(`/api/web/deleteoutbounddetail`, options);
};