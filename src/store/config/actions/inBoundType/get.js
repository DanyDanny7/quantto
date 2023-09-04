import request, { Methods, withToken } from "../../../../assets/util/request";

//* ACTIONTYPES --------------------------------------------
export const GET_IN_BOUND_TYPE_LOADING = 'GET_IN_BOUND_TYPE_LOADING';
export const GET_IN_BOUND_TYPE_SUCCESS = 'GET_IN_BOUND_TYPE_SUCCESS';
export const GET_IN_BOUND_TYPE_REJECT = 'GET_IN_BOUND_TYPE_REJECT';

//* ACTIONS ------------------------------------------------
export const getInBoundTypeLoading = () => ({ type: GET_IN_BOUND_TYPE_LOADING });
export const getInBoundTypeSuccess = (payload) => ({ type: GET_IN_BOUND_TYPE_SUCCESS, payload });
export const getInBoundTypeReject = (payload) => ({ type: GET_IN_BOUND_TYPE_REJECT, payload });

//* REQUEST SERVICE ---------------------------------------
export const getInBoundTypeRequest = async (params = {}, getState) => {
    const options = await withToken({
        method: Methods.GET,
        params,
    }, getState);
    return request(`/api/web/getinboundtypes`, options);
};
