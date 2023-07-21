import request, { Methods, withToken } from "../../../../../assets/util/request";

//* ACTIONTYPES --------------------------------------------
export const GET_INVENTARY_DETAIL_LOADING = 'GET_INVENTARY_DETAIL_LOADING';
export const GET_INVENTARY_DETAIL_SUCCESS = 'GET_INVENTARY_DETAIL_SUCCESS';
export const GET_INVENTARY_DETAIL_REJECT = 'GET_INVENTARY_DETAIL_REJECT';

//* ACTIONS ------------------------------------------------
export const getInventaryDetailLoading = () => ({ type: GET_INVENTARY_DETAIL_LOADING });
export const getInventaryDetailSuccess = (payload) => ({ type: GET_INVENTARY_DETAIL_SUCCESS, payload });
export const getInventaryDetailReject = (payload) => ({ type: GET_INVENTARY_DETAIL_REJECT, payload });

//* REQUEST SERVICE ---------------------------------------
export const getInventaryDetailRequest = async (params = {}, getState) => {
    const options = await withToken({
        method: Methods.GET,
        params,
    }, getState);
    return request(`/api/Web/getinventorybyid`, options);
};


