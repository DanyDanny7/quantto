import request, { Methods, withToken } from "../../../../assets/util/request";

//* ACTIONTYPES --------------------------------------------
export const PUT_OUT_BOUND_TYPE_RESET = 'PUT_OUT_BOUND_TYPE_RESET';
export const PUT_OUT_BOUND_TYPE_LOADING = 'PUT_OUT_BOUND_TYPE_LOADING';
export const PUT_OUT_BOUND_TYPE_SUCCESS = 'PUT_OUT_BOUND_TYPE_SUCCESS';
export const PUT_OUT_BOUND_TYPE_REJECT = 'PUT_OUT_BOUND_TYPE_REJECT';

//* ACTIONS ------------------------------------------------
export const putOutBoundTypeReset = () => ({ type: PUT_OUT_BOUND_TYPE_RESET });
export const putOutBoundTypeLoading = () => ({ type: PUT_OUT_BOUND_TYPE_LOADING });
export const putOutBoundTypeSuccess = (payload) => ({ type: PUT_OUT_BOUND_TYPE_SUCCESS, payload });
export const putOutBoundTypeReject = (payload) => ({ type: PUT_OUT_BOUND_TYPE_REJECT, payload });

//* REQUEST SERVICE ---------------------------------------
export const putOutBoundTypeRequest = async (data, getState) => {
    const options = await withToken({
        method: Methods.PUT,
        data,
    }, getState);
    return request(`/api/web/updateoutboundtypes`, options);
};

