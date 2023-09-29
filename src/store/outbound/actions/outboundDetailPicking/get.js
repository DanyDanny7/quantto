import request, { Methods, withToken } from "../../../../assets/util/request";

//* ACTIONTYPES --------------------------------------------
export const GET_INBOUND_DETAIL_PICKING_LOADING = 'GET_INBOUND_DETAIL_PICKING_LOADING';
export const GET_INBOUND_DETAIL_PICKING_SUCCESS = 'GET_INBOUND_DETAIL_PICKING_SUCCESS';
export const GET_INBOUND_DETAIL_PICKING_REJECT = 'GET_INBOUND_DETAIL_PICKING_REJECT';

//* ACTIONS ------------------------------------------------
export const getOutboundDetailPickingLoading = () => ({ type: GET_INBOUND_DETAIL_PICKING_LOADING });
export const getOutboundDetailPickingSuccess = (payload) => ({ type: GET_INBOUND_DETAIL_PICKING_SUCCESS, payload });
export const getOutboundDetailPickingReject = (payload) => ({ type: GET_INBOUND_DETAIL_PICKING_REJECT, payload });

//* REQUEST SERVICE ---------------------------------------
export const getOutboundDetailPickingRequest = async (params = {}, getState) => {
    const options = await withToken({
        method: Methods.GET,
        params,
    }, getState);
    return request(`/api/web/getoutboundDetailPicking`, options);
};
