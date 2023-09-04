import request, { Methods, withToken } from "../../../../assets/util/request";

//* ACTIONTYPES --------------------------------------------
export const DELETE_STATE_PRODUCTS_RESET = 'DELETE_STATE_PRODUCTS_RESET';
export const DELETE_STATE_PRODUCTS_LOADING = 'DELETE_STATE_PRODUCTS_LOADING';
export const DELETE_STATE_PRODUCTS_SUCCESS = 'DELETE_STATE_PRODUCTS_SUCCESS';
export const DELETE_STATE_PRODUCTS_REJECT = 'DELETE_STATE_PRODUCTS_REJECT';

//* ACTIONS ------------------------------------------------
export const deleteStateProductsReset = () => ({ type: DELETE_STATE_PRODUCTS_RESET });
export const deleteStateProductsLoading = () => ({ type: DELETE_STATE_PRODUCTS_LOADING });
export const deleteStateProductsSuccess = (payload) => ({ type: DELETE_STATE_PRODUCTS_SUCCESS, payload });
export const deleteStateProductsReject = (payload) => ({ type: DELETE_STATE_PRODUCTS_REJECT, payload });

//* REQUEST SERVICE ---------------------------------------
export const deleteStateProductsRequest = async (data, getState) => {
    const options = await withToken({
        method: Methods.DELETE,
        data,
    }, getState);
    return request(`/api/web/deleteitemstatus`, options);
};
