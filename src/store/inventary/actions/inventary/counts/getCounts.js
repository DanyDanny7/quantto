import request, { Methods, withToken } from "../../../../../assets/util/request";

//* ACTIONTYPES --------------------------------------------
export const GET_INVENTARY_COUNTS_LOADING = 'GET_INVENTARY_COUNTS_LOADING';
export const GET_INVENTARY_COUNTS_SUCCESS = 'GET_INVENTARY_COUNTS_SUCCESS';
export const GET_INVENTARY_COUNTS_REJECT = 'GET_INVENTARY_COUNTS_REJECT';

//* ACTIONS ------------------------------------------------
export const getInventaryCountsLoading = () => ({ type: GET_INVENTARY_COUNTS_LOADING });
export const getInventaryCountsSuccess = (payload) => ({ type: GET_INVENTARY_COUNTS_SUCCESS, payload });
export const getInventaryCountsReject = (payload) => ({ type: GET_INVENTARY_COUNTS_REJECT, payload });

//* REQUEST SERVICE ---------------------------------------
export const getInventaryCountsRequest = async (params = {}, getState) => {
    const options = await withToken({
        method: Methods.GET,
        params,
    }, getState);
    return request(`/api/web/getcounts`, options);
};


