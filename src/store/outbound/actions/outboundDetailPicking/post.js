import request, { Methods, withToken } from "../../../../assets/util/request";

//* ACTIONTYPES --------------------------------------------
export const POST_INBOUND_DETAIL_PICKING_RESET = 'POST_INBOUND_DETAIL_PICKING_RESET';
export const POST_INBOUND_DETAIL_PICKING_LOADING = 'POST_INBOUND_DETAIL_PICKING_LOADING';
export const POST_INBOUND_DETAIL_PICKING_SUCCESS = 'POST_INBOUND_DETAIL_PICKING_SUCCESS';
export const POST_INBOUND_DETAIL_PICKING_REJECT = 'POST_INBOUND_DETAIL_PICKING_REJECT';

//* ACTIONS ------------------------------------------------
export const postOutboundDetailPickingReset = () => ({ type: POST_INBOUND_DETAIL_PICKING_RESET });
export const postOutboundDetailPickingLoading = () => ({ type: POST_INBOUND_DETAIL_PICKING_LOADING });
export const postOutboundDetailPickingSuccess = (payload) => ({ type: POST_INBOUND_DETAIL_PICKING_SUCCESS, payload });
export const postOutboundDetailPickingReject = (payload) => ({ type: POST_INBOUND_DETAIL_PICKING_REJECT, payload });

//* REQUEST SERVICE ---------------------------------------
export const postOutboundDetailPickingRequest = async (data, getState) => {
    const options = await withToken({
        method: Methods.POST,
        data,
    }, getState);
    return request(`/api/web/addoutbounddetailpicking`, options);
};
