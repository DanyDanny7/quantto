import request, { Methods, withToken } from "../../../../assets/util/request";

//* ACTIONTYPES --------------------------------------------
export const GET_OUT_BOUND_TYPE_LOADING = 'GET_OUT_BOUND_TYPE_LOADING';
export const GET_OUT_BOUND_TYPE_SUCCESS = 'GET_OUT_BOUND_TYPE_SUCCESS';
export const GET_OUT_BOUND_TYPE_REJECT = 'GET_OUT_BOUND_TYPE_REJECT';

//* ACTIONS ------------------------------------------------
export const getOutBoundTypeLoading = () => ({ type: GET_OUT_BOUND_TYPE_LOADING });
export const getOutBoundTypeSuccess = (payload) => ({ type: GET_OUT_BOUND_TYPE_SUCCESS, payload });
export const getOutBoundTypeReject = (payload) => ({ type: GET_OUT_BOUND_TYPE_REJECT, payload });

//* REQUEST SERVICE ---------------------------------------
export const getOutBoundTypeRequest = async (params = {}, getState) => {
    const options = await withToken({
        method: Methods.GET,
        params,
    }, getState);
    return request(`/api/web/getoutboundtypes`, options);
};
