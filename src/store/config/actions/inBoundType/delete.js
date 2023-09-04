import request, { Methods, withToken } from "../../../../assets/util/request";

//* ACTIONTYPES --------------------------------------------
export const DELETE_IN_BOUND_TYPE_RESET = 'DELETE_IN_BOUND_TYPE_RESET';
export const DELETE_IN_BOUND_TYPE_LOADING = 'DELETE_IN_BOUND_TYPE_LOADING';
export const DELETE_IN_BOUND_TYPE_SUCCESS = 'DELETE_IN_BOUND_TYPE_SUCCESS';
export const DELETE_IN_BOUND_TYPE_REJECT = 'DELETE_IN_BOUND_TYPE_REJECT';

//* ACTIONS ------------------------------------------------
export const deleteInBoundTypeReset = () => ({ type: DELETE_IN_BOUND_TYPE_RESET });
export const deleteInBoundTypeLoading = () => ({ type: DELETE_IN_BOUND_TYPE_LOADING });
export const deleteInBoundTypeSuccess = (payload) => ({ type: DELETE_IN_BOUND_TYPE_SUCCESS, payload });
export const deleteInBoundTypeReject = (payload) => ({ type: DELETE_IN_BOUND_TYPE_REJECT, payload });

//* REQUEST SERVICE ---------------------------------------
export const deleteInBoundTypeRequest = async (data, getState) => {
    const options = await withToken({
        method: Methods.DELETE,
        data,
    }, getState);
    return request(`/api/web/deleteinboundtypes`, options);
};
