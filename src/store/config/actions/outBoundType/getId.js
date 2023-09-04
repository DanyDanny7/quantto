import request, { Methods, withToken } from "../../../../assets/util/request";

//* ACTIONTYPES --------------------------------------------
export const GET_OUT_BOUND_TYPE_ID_LOADING = 'GET_OUT_BOUND_TYPE_ID_LOADING';
export const GET_OUT_BOUND_TYPE_ID_SUCCESS = 'GET_OUT_BOUND_TYPE_ID_SUCCESS';
export const GET_OUT_BOUND_TYPE_ID_REJECT = 'GET_OUT_BOUND_TYPE_ID_REJECT';

//* ACTIONS ------------------------------------------------
export const getOutBoundTypeIdLoading = () => ({ type: GET_OUT_BOUND_TYPE_ID_LOADING });
export const getOutBoundTypeIdSuccess = (payload) => ({ type: GET_OUT_BOUND_TYPE_ID_SUCCESS, payload });
export const getOutBoundTypeIdReject = (payload) => ({ type: GET_OUT_BOUND_TYPE_ID_REJECT, payload });

//* REQUEST SERVICE ---------------------------------------
export const getOutBoundTypeIdRequest = async (params = {}, getState) => {
    const options = await withToken({
        method: Methods.GET,
        params,
    }, getState);
    return request(`/api/web/getoutboundtypesbyid`, options);
};
