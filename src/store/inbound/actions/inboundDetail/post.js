import request, { Methods, withToken } from "../../../../assets/util/request";

//* ACTIONTYPES --------------------------------------------
export const POST_INBOUND_DETAIL_RESET = 'POST_INBOUND_DETAIL_RESET';
export const POST_INBOUND_DETAIL_LOADING = 'POST_INBOUND_DETAIL_LOADING';
export const POST_INBOUND_DETAIL_SUCCESS = 'POST_INBOUND_DETAIL_SUCCESS';
export const POST_INBOUND_DETAIL_REJECT = 'POST_INBOUND_DETAIL_REJECT';

//* ACTIONS ------------------------------------------------
export const postInboundDetailReset = () => ({ type: POST_INBOUND_DETAIL_RESET });
export const postInboundDetailLoading = () => ({ type: POST_INBOUND_DETAIL_LOADING });
export const postInboundDetailSuccess = (payload) => ({ type: POST_INBOUND_DETAIL_SUCCESS, payload });
export const postInboundDetailReject = (payload) => ({ type: POST_INBOUND_DETAIL_REJECT, payload });

//* REQUEST SERVICE ---------------------------------------
export const postInboundDetailRequest = async (data, getState) => {
    const options = await withToken({
        method: Methods.POST,
        data,
    }, getState);
    return request(`/api/web/addinbounddetail`, options);
};
