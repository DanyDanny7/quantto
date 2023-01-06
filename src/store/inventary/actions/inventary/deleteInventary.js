import request, { Methods, withToken } from "../../../../assets/util/request";

//* ACTIONTYPES --------------------------------------------
export const DELETE_INVENTARY_RESET = 'DELETE_INVENTARY_RESET';
export const DELETE_INVENTARY_LOADING = 'DELETE_INVENTARY_LOADING';
export const DELETE_INVENTARY_SUCCESS = 'DELETE_INVENTARY_SUCCESS';
export const DELETE_INVENTARY_REJECT = 'DELETE_INVENTARY_REJECT';

//* ACTIONS ------------------------------------------------
export const deleteInventaryReset = () => ({ type: DELETE_INVENTARY_RESET });
export const deleteInventaryLoading = () => ({ type: DELETE_INVENTARY_LOADING });
export const deleteInventarySuccess = (payload) => ({ type: DELETE_INVENTARY_SUCCESS, payload });
export const deleteInventaryReject = (payload) => ({ type: DELETE_INVENTARY_REJECT, payload });

//* REQUEST SERVICE ---------------------------------------
export const deleteInventaryRequest = async (data, getState) => {
    console.log(getState)
    const options = await withToken({
        method: Methods.DELETE,
        data,
    }, getState);
    // return request(`/api/web/deletecounters`, options);
    return request(`/api/web/deleteinventory`, options);
};


