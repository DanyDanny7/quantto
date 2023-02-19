import request, { Methods, withToken } from "../../../../assets/util/request";

//* ACTIONTYPES --------------------------------------------
export const GET_INVENTARY_FREE_LOADING = 'GET_INVENTARY_FREE_LOADING';
export const GET_INVENTARY_FREE_SUCCESS = 'GET_INVENTARY_FREE_SUCCESS';
export const GET_INVENTARY_FREE_REJECT = 'GET_INVENTARY_FREE_REJECT';

//* ACTIONS ------------------------------------------------
export const getInventaryFreeLoading = () => ({ type: GET_INVENTARY_FREE_LOADING });
export const getInventaryFreeSuccess = (payload) => ({ type: GET_INVENTARY_FREE_SUCCESS, payload });
export const getInventaryFreeReject = (payload) => ({ type: GET_INVENTARY_FREE_REJECT, payload });

//* REQUEST SERVICE ---------------------------------------
export const getInventaryFreeRequest = async (params = {}, getState) => {
    const options = await withToken({
        method: Methods.GET,
        params,
    }, getState);
    return request(`/api/web/getvalidateiventoryforfree`, options);
};


