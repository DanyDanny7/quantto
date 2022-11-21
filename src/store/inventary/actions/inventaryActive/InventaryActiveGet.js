import request, { Methods, withToken } from "../../../../assets/util/request";

//* ACTIONTYPES --------------------------------------------
export const GET_INVENTARY_ACTIVE_LOADING = 'GET_INVENTARY_ACTIVE_LOADING';
export const GET_INVENTARY_ACTIVE_SUCCESS = 'GET_INVENTARY_ACTIVE_SUCCESS';
export const GET_INVENTARY_ACTIVE_REJECT = 'GET_INVENTARY_ACTIVE_REJECT';

//* ACTIONS ------------------------------------------------
export const getInventaryActiveLoading = () => ({ type: GET_INVENTARY_ACTIVE_LOADING });
export const getInventaryActiveSuccess = (payload) => ({ type: GET_INVENTARY_ACTIVE_SUCCESS, payload });
export const getInventaryActiveReject = (payload) => ({ type: GET_INVENTARY_ACTIVE_REJECT, payload });

//* REQUEST SERVICE ---------------------------------------
export const getInventaryActiveRequest = async (params = {}, getState) => {
    const options = await withToken({
        method: Methods.GET,
        params,
    }, getState);
    // return request(`/api/web/getcounts`, options);
    // return request(`/api/Web/GetCountsById/1`, options);
    // return request(`/api/Web/GetInventoryByTempleteId/1`, options);
    // return request(`/api/Web/GetInventoryById/1`, options);
    return request(`/api/Web/GetCounters/1`, options);
};


