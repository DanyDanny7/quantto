import request, { Methods, withToken } from "../../../../../assets/util/request";

//* ACTIONTYPES --------------------------------------------
export const DELETE_INVENTARY_COUNT_RESET = 'DELETE_INVENTARY_COUNT_RESET';
export const DELETE_INVENTARY_COUNT_LOADING = 'DELETE_INVENTARY_COUNT_LOADING';
export const DELETE_INVENTARY_COUNT_SUCCESS = 'DELETE_INVENTARY_COUNT_SUCCESS';
export const DELETE_INVENTARY_COUNT_REJECT = 'DELETE_INVENTARY_COUNT_REJECT';

//* ACTIONS ------------------------------------------------
export const deleteInventaryCountReset = () => ({ type: DELETE_INVENTARY_COUNT_RESET });
export const deleteInventaryCountLoading = () => ({ type: DELETE_INVENTARY_COUNT_LOADING });
export const deleteInventaryCountSuccess = (payload) => ({ type: DELETE_INVENTARY_COUNT_SUCCESS, payload });
export const deleteInventaryCountReject = (payload) => ({ type: DELETE_INVENTARY_COUNT_REJECT, payload });

//* REQUEST SERVICE ---------------------------------------
export const deleteInventaryCountRequest = async (data, getState) => {
    const options = await withToken({
        method: Methods.DELETE,
        data,
    }, getState);
    return request(`/api/web/deletecountline`, options);
};


