import request, { Methods, withToken } from "../../../../assets/util/request";

//* ACTIONTYPES --------------------------------------------
export const DELETE_INBOUND_DETAIL_PICKING_RESET = 'DELETE_INBOUND_DETAIL_PICKING_RESET';
export const DELETE_INBOUND_DETAIL_PICKING_LOADING = 'DELETE_INBOUND_DETAIL_PICKING_LOADING';
export const DELETE_INBOUND_DETAIL_PICKING_SUCCESS = 'DELETE_INBOUND_DETAIL_PICKING_SUCCESS';
export const DELETE_INBOUND_DETAIL_PICKING_REJECT = 'DELETE_INBOUND_DETAIL_PICKING_REJECT';

//* ACTIONS ------------------------------------------------
export const deleteOutboundDetailPickingReset = () => ({ type: DELETE_INBOUND_DETAIL_PICKING_RESET });
export const deleteOutboundDetailPickingLoading = () => ({ type: DELETE_INBOUND_DETAIL_PICKING_LOADING });
export const deleteOutboundDetailPickingSuccess = (payload) => ({ type: DELETE_INBOUND_DETAIL_PICKING_SUCCESS, payload });
export const deleteOutboundDetailPickingReject = (payload) => ({ type: DELETE_INBOUND_DETAIL_PICKING_REJECT, payload });

//* REQUEST SERVICE ---------------------------------------
export const deleteOutboundDetailPickingRequest = async (data, getState) => {
    const options = await withToken({
        method: Methods.DELETE,
        data,
    }, getState);
    return request(`/api/web/deleteoutbounddetailpicking`, options);
};