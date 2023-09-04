import request, { Methods, withToken } from "../../../../assets/util/request";

//* ACTIONTYPES --------------------------------------------
export const DELETE_OUT_BOUND_TYPE_RESET = 'DELETE_OUT_BOUND_TYPE_RESET';
export const DELETE_OUT_BOUND_TYPE_LOADING = 'DELETE_OUT_BOUND_TYPE_LOADING';
export const DELETE_OUT_BOUND_TYPE_SUCCESS = 'DELETE_OUT_BOUND_TYPE_SUCCESS';
export const DELETE_OUT_BOUND_TYPE_REJECT = 'DELETE_OUT_BOUND_TYPE_REJECT';

//* ACTIONS ------------------------------------------------
export const deleteOutBoundTypeReset = () => ({ type: DELETE_OUT_BOUND_TYPE_RESET });
export const deleteOutBoundTypeLoading = () => ({ type: DELETE_OUT_BOUND_TYPE_LOADING });
export const deleteOutBoundTypeSuccess = (payload) => ({ type: DELETE_OUT_BOUND_TYPE_SUCCESS, payload });
export const deleteOutBoundTypeReject = (payload) => ({ type: DELETE_OUT_BOUND_TYPE_REJECT, payload });

//* REQUEST SERVICE ---------------------------------------
export const deleteOutBoundTypeRequest = async (data, getState) => {
    const options = await withToken({
        method: Methods.DELETE,
        data,
    }, getState);
    return request(`/api/web/deleteoutboundtypes`, options);
};
