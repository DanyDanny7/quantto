import request, { Methods, withToken } from "../../../../assets/util/request";

//* ACTIONTYPES --------------------------------------------
export const PUT_INBOUND_DETAIL_RESET = 'PUT_INBOUND_DETAIL_RESET';
export const PUT_INBOUND_DETAIL_LOADING = 'PUT_INBOUND_DETAIL_LOADING';
export const PUT_INBOUND_DETAIL_SUCCESS = 'PUT_INBOUND_DETAIL_SUCCESS';
export const PUT_INBOUND_DETAIL_REJECT = 'PUT_INBOUND_DETAIL_REJECT';

//* ACTIONS ------------------------------------------------
export const putOutboundDetailReset = () => ({ type: PUT_INBOUND_DETAIL_RESET });
export const putOutboundDetailLoading = () => ({ type: PUT_INBOUND_DETAIL_LOADING });
export const putOutboundDetailSuccess = (payload) => ({ type: PUT_INBOUND_DETAIL_SUCCESS, payload });
export const putOutboundDetailReject = (payload) => ({ type: PUT_INBOUND_DETAIL_REJECT, payload });

//* REQUEST SERVICE ---------------------------------------
export const putOutboundDetailRequest = async (data, getState) => {
    const options = await withToken({
        method: Methods.PUT,
        data,
    }, getState);
    return request(`/api/web/updateoutbounddetail`, options);
};
