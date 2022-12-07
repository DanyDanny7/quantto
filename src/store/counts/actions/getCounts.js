import request, { Methods, withToken } from "../../../assets/util/request";

//* ACTIONTYPES --------------------------------------------
export const GET_COUNTS_LOADING = 'GET_COUNTS_LOADING';
export const GET_COUNTS_SUCCESS = 'GET_COUNTS_SUCCESS';
export const GET_COUNTS_REJECT = 'GET_COUNTS_REJECT';

//* ACTIONS ------------------------------------------------
export const getCountsLoading = () => ({ type: GET_COUNTS_LOADING });
export const getCountsSuccess = (payload) => ({ type: GET_COUNTS_SUCCESS, payload });
export const getCountsReject = (payload) => ({ type: GET_COUNTS_REJECT, payload });

//* REQUEST SERVICE ---------------------------------------
export const getCountsRequest = async (params = {}, getState) => {
    const options = await withToken({
        method: Methods.GET,
        params,
    }, getState);
    return request(`/api/web/getcounters`, options);
};


