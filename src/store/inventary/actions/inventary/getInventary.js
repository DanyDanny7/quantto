import request, { Methods, withToken } from "../../../../assets/util/request";

//* ACTIONTYPES --------------------------------------------
export const GET_INVENTARY_LOADING = 'GET_INVENTARY_LOADING';
export const GET_INVENTARY_SUCCESS = 'GET_INVENTARY_SUCCESS';
export const GET_INVENTARY_REJECT = 'GET_INVENTARY_REJECT';

//* ACTIONS ------------------------------------------------
export const getInventaryLoading = () => ({ type: GET_INVENTARY_LOADING });
export const getInventarySuccess = (payload) => ({ type: GET_INVENTARY_SUCCESS, payload });
export const getInventaryReject = (payload) => ({ type: GET_INVENTARY_REJECT, payload });

//* REQUEST SERVICE ---------------------------------------
export const getInventaryRequest = async (params = {}, getState) => {
    const options = await withToken({
        method: Methods.GET,
        params,
    }, getState);
    return request(`/api/web/getinventories`, options);
};


