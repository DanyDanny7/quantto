import request, { Methods, withToken } from "../../../../../assets/util/request";

//* ACTIONTYPES --------------------------------------------
export const GET_INVENTARY_ACTIVE_COUNTS_LOADING = 'GET_INVENTARY_ACTIVE_COUNTS_LOADING';
export const GET_INVENTARY_ACTIVE_COUNTS_SUCCESS = 'GET_INVENTARY_ACTIVE_COUNTS_SUCCESS';
export const GET_INVENTARY_ACTIVE_COUNTS_REJECT = 'GET_INVENTARY_ACTIVE_COUNTS_REJECT';

//* ACTIONS ------------------------------------------------
export const getInventaryActiveCountsLoading = () => ({ type: GET_INVENTARY_ACTIVE_COUNTS_LOADING });
export const getInventaryActiveCountsSuccess = (payload) => ({ type: GET_INVENTARY_ACTIVE_COUNTS_SUCCESS, payload });
export const getInventaryActiveCountsReject = (payload) => ({ type: GET_INVENTARY_ACTIVE_COUNTS_REJECT, payload });

//* REQUEST SERVICE ---------------------------------------
export const getInventaryActiveCountsRequest = async (params = {}, getState) => {
    const options = await withToken({
        method: Methods.GET,
        params,
    }, getState);
    return request(`/api/web/getcounts`, options);
};


