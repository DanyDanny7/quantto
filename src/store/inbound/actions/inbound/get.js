import request, { Methods, withToken } from "../../../../assets/util/request";

//* ACTIONTYPES --------------------------------------------
export const GET_INBOUND_LOADING = 'GET_INBOUND_LOADING';
export const GET_INBOUND_SUCCESS = 'GET_INBOUND_SUCCESS';
export const GET_INBOUND_REJECT = 'GET_INBOUND_REJECT';

//* ACTIONS ------------------------------------------------
export const getInboundLoading = () => ({ type: GET_INBOUND_LOADING });
export const getInboundSuccess = (payload) => ({ type: GET_INBOUND_SUCCESS, payload });
export const getInboundReject = (payload) => ({ type: GET_INBOUND_REJECT, payload });

//* REQUEST SERVICE ---------------------------------------
export const getInboundRequest = async (params = {}, getState) => {
    const options = await withToken({
        method: Methods.GET,
        params,
    }, getState);
    return request(`/api/web/getinbound`, options);
};
