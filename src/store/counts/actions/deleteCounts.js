import request, { Methods, withToken } from "../../../assets/util/request";

//* ACTIONTYPES --------------------------------------------
export const DELETE_COUNT_RESET = 'DELETE_COUNT_RESET';
export const DELETE_COUNT_LOADING = 'DELETE_COUNT_LOADING';
export const DELETE_COUNT_SUCCESS = 'DELETE_COUNT_SUCCESS';
export const DELETE_COUNT_REJECT = 'DELETE_COUNT_REJECT';

//* ACTIONS ------------------------------------------------
export const deleteCountReset = () => ({ type: DELETE_COUNT_RESET });
export const deleteCountLoading = () => ({ type: DELETE_COUNT_LOADING });
export const deleteCountSuccess = (payload) => ({ type: DELETE_COUNT_SUCCESS, payload });
export const deleteCountReject = (payload) => ({ type: DELETE_COUNT_REJECT, payload });

//* REQUEST SERVICE ---------------------------------------
export const deleteCountRequest = async (data, getState) => {
    const options = await withToken({
        method: Methods.DELETE,
        data,
    }, getState);
    return request(`/api/web/deletecounters`, options);
};


