import request, { Methods, withToken } from "../../../../../assets/util/request";

//* ACTIONTYPES --------------------------------------------
export const GET_INVENTARY_DETAIL_PAYING_LOADING = 'GET_INVENTARY_DETAIL_PAYING_LOADING';
export const GET_INVENTARY_DETAIL_PAYING_SUCCESS = 'GET_INVENTARY_DETAIL_PAYING_SUCCESS';
export const GET_INVENTARY_DETAIL_PAYING_REJECT = 'GET_INVENTARY_DETAIL_PAYING_REJECT';

//* ACTIONS ------------------------------------------------
export const getInventaryDetailPayingLoading = () => ({ type: GET_INVENTARY_DETAIL_PAYING_LOADING });
export const getInventaryDetailPayingSuccess = (payload) => ({ type: GET_INVENTARY_DETAIL_PAYING_SUCCESS, payload });
export const getInventaryDetailPayingReject = (payload) => ({ type: GET_INVENTARY_DETAIL_PAYING_REJECT, payload });

//* REQUEST SERVICE ---------------------------------------
export const getInventaryDetailPayingRequest = async (params = {}, getState) => {
    const options = await withToken({
        method: Methods.GET,
        params,
    }, getState);
    return request(`/api/Web/getinventoryinfotopayment`, options);
};


