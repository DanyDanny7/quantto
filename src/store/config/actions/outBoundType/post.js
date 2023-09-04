import request, { Methods, withToken } from "../../../../assets/util/request";

//* ACTIONTYPES --------------------------------------------
export const POST_OUT_BOUND_TYPE_RESET = 'POST_OUT_BOUND_TYPE_RESET';
export const POST_OUT_BOUND_TYPE_LOADING = 'POST_OUT_BOUND_TYPE_LOADING';
export const POST_OUT_BOUND_TYPE_SUCCESS = 'POST_OUT_BOUND_TYPE_SUCCESS';
export const POST_OUT_BOUND_TYPE_REJECT = 'POST_OUT_BOUND_TYPE_REJECT';

//* ACTIONS ------------------------------------------------
export const postOutBoundTypeReset = () => ({ type: POST_OUT_BOUND_TYPE_RESET });
export const postOutBoundTypeLoading = () => ({ type: POST_OUT_BOUND_TYPE_LOADING });
export const postOutBoundTypeSuccess = (payload) => ({ type: POST_OUT_BOUND_TYPE_SUCCESS, payload });
export const postOutBoundTypeReject = (payload) => ({ type: POST_OUT_BOUND_TYPE_REJECT, payload });

//* REQUEST SERVICE ---------------------------------------
export const postOutBoundTypeRequest = async (data, getState) => {
    const options = await withToken({
        method: Methods.POST,
        data,
    }, getState);
    return request(`/api/web/addoutboundtypes`, options);
};
