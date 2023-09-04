import request, { Methods, withToken } from "../../../../assets/util/request";

//* ACTIONTYPES --------------------------------------------
export const GET_IN_BOUND_TYPE_ID_LOADING = 'GET_IN_BOUND_TYPE_ID_LOADING';
export const GET_IN_BOUND_TYPE_ID_SUCCESS = 'GET_IN_BOUND_TYPE_ID_SUCCESS';
export const GET_IN_BOUND_TYPE_ID_REJECT = 'GET_IN_BOUND_TYPE_ID_REJECT';

//* ACTIONS ------------------------------------------------
export const getInBoundTypeIdLoading = () => ({ type: GET_IN_BOUND_TYPE_ID_LOADING });
export const getInBoundTypeIdSuccess = (payload) => ({ type: GET_IN_BOUND_TYPE_ID_SUCCESS, payload });
export const getInBoundTypeIdReject = (payload) => ({ type: GET_IN_BOUND_TYPE_ID_REJECT, payload });

//* REQUEST SERVICE ---------------------------------------
export const getInBoundTypeIdRequest = async (params = {}, getState) => {
    const options = await withToken({
        method: Methods.GET,
        params,
    }, getState);
    return request(`/api/web/getinboundtypesbyid`, options);
};
