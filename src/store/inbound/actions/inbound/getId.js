import request, { Methods, withToken } from "../../../../assets/util/request";

//* ACTIONTYPES --------------------------------------------
export const GET_INBOUND_ID_LOADING = 'GET_INBOUND_ID_LOADING';
export const GET_INBOUND_ID_SUCCESS = 'GET_INBOUND_ID_SUCCESS';
export const GET_INBOUND_ID_REJECT = 'GET_INBOUND_ID_REJECT';

//* ACTIONS ------------------------------------------------
export const getInboundIdLoading = () => ({ type: GET_INBOUND_ID_LOADING });
export const getInboundIdSuccess = (payload) => ({ type: GET_INBOUND_ID_SUCCESS, payload });
export const getInboundIdReject = (payload) => ({ type: GET_INBOUND_ID_REJECT, payload });

//* REQUEST SERVICE ---------------------------------------
export const getInboundIdRequest = async (params = {}, getState) => {
    const options = await withToken({
        method: Methods.GET,
        params,
    }, getState);
    return request(`/api/web/getinboundbyid`, options);
};
