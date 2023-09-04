import request, { Methods, withToken } from "../../../../assets/util/request";

//* ACTIONTYPES --------------------------------------------
export const POST_INBOUND_DETAIL_RESET = 'POST_INBOUND_DETAIL_RESET';
export const POST_INBOUND_DETAIL_LOADING = 'POST_INBOUND_DETAIL_LOADING';
export const POST_INBOUND_DETAIL_SUCCESS = 'POST_INBOUND_DETAIL_SUCCESS';
export const POST_INBOUND_DETAIL_REJECT = 'POST_INBOUND_DETAIL_REJECT';

//* ACTIONS ------------------------------------------------
export const postOutboundDetailReset = () => ({ type: POST_INBOUND_DETAIL_RESET });
export const postOutboundDetailLoading = () => ({ type: POST_INBOUND_DETAIL_LOADING });
export const postOutboundDetailSuccess = (payload) => ({ type: POST_INBOUND_DETAIL_SUCCESS, payload });
export const postOutboundDetailReject = (payload) => ({ type: POST_INBOUND_DETAIL_REJECT, payload });

//* REQUEST SERVICE ---------------------------------------
export const postOutboundDetailRequest = async (data, getState) => {
    const options = await withToken({
        method: Methods.POST,
        data,
    }, getState);
    return request(`/api/web/addoutbounddetail`, options);
};
