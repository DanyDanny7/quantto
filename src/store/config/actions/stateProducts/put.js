import request, { Methods, withToken } from "../../../../assets/util/request";

//* ACTIONTYPES --------------------------------------------
export const PUT_STATE_PRODUCTS_RESET = 'PUT_STATE_PRODUCTS_RESET';
export const PUT_STATE_PRODUCTS_LOADING = 'PUT_STATE_PRODUCTS_LOADING';
export const PUT_STATE_PRODUCTS_SUCCESS = 'PUT_STATE_PRODUCTS_SUCCESS';
export const PUT_STATE_PRODUCTS_REJECT = 'PUT_STATE_PRODUCTS_REJECT';

//* ACTIONS ------------------------------------------------
export const putStateProductsReset = () => ({ type: PUT_STATE_PRODUCTS_RESET });
export const putStateProductsLoading = () => ({ type: PUT_STATE_PRODUCTS_LOADING });
export const putStateProductsSuccess = (payload) => ({ type: PUT_STATE_PRODUCTS_SUCCESS, payload });
export const putStateProductsReject = (payload) => ({ type: PUT_STATE_PRODUCTS_REJECT, payload });

//* REQUEST SERVICE ---------------------------------------
export const putStateProductsRequest = async (data, getState) => {
    const options = await withToken({
        method: Methods.PUT,
        data,
    }, getState);
    return request(`/api/web/updateitemstatus`, options);
};

