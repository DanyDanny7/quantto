import request, { Methods, withToken } from "../../../../assets/util/request";

//* ACTIONTYPES --------------------------------------------
export const PUT_INBOUND_DETAIL_RESET = 'PUT_INBOUND_DETAIL_RESET';
export const PUT_INBOUND_DETAIL_LOADING = 'PUT_INBOUND_DETAIL_LOADING';
export const PUT_INBOUND_DETAIL_SUCCESS = 'PUT_INBOUND_DETAIL_SUCCESS';
export const PUT_INBOUND_DETAIL_REJECT = 'PUT_INBOUND_DETAIL_REJECT';

//* ACTIONS ------------------------------------------------
export const putInboundDetailReset = () => ({ type: PUT_INBOUND_DETAIL_RESET });
export const putInboundDetailLoading = () => ({ type: PUT_INBOUND_DETAIL_LOADING });
export const putInboundDetailSuccess = (payload) => ({ type: PUT_INBOUND_DETAIL_SUCCESS, payload });
export const putInboundDetailReject = (payload) => ({ type: PUT_INBOUND_DETAIL_REJECT, payload });

//* REQUEST SERVICE ---------------------------------------
export const putInboundDetailRequest = async (data, getState) => {
    const options = await withToken({
        method: Methods.PUT,
        data,
    }, getState);
    return request(`/api/web/updateinbounddetail`, options);
};
