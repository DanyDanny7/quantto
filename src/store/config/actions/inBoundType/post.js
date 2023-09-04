import request, { Methods, withToken } from "../../../../assets/util/request";

//* ACTIONTYPES --------------------------------------------
export const POST_IN_BOUND_TYPE_RESET = 'POST_IN_BOUND_TYPE_RESET';
export const POST_IN_BOUND_TYPE_LOADING = 'POST_IN_BOUND_TYPE_LOADING';
export const POST_IN_BOUND_TYPE_SUCCESS = 'POST_IN_BOUND_TYPE_SUCCESS';
export const POST_IN_BOUND_TYPE_REJECT = 'POST_IN_BOUND_TYPE_REJECT';

//* ACTIONS ------------------------------------------------
export const postInBoundTypeReset = () => ({ type: POST_IN_BOUND_TYPE_RESET });
export const postInBoundTypeLoading = () => ({ type: POST_IN_BOUND_TYPE_LOADING });
export const postInBoundTypeSuccess = (payload) => ({ type: POST_IN_BOUND_TYPE_SUCCESS, payload });
export const postInBoundTypeReject = (payload) => ({ type: POST_IN_BOUND_TYPE_REJECT, payload });

//* REQUEST SERVICE ---------------------------------------
export const postInBoundTypeRequest = async (data, getState) => {
    const options = await withToken({
        method: Methods.POST,
        data,
    }, getState);
    return request(`/api/web/addinboundtypes`, options);
};
