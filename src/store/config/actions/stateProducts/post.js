import request, { Methods, withToken } from "../../../../assets/util/request";

//* ACTIONTYPES --------------------------------------------
export const POST_STATE_PRODUCTS_RESET = 'POST_STATE_PRODUCTS_RESET';
export const POST_STATE_PRODUCTS_LOADING = 'POST_STATE_PRODUCTS_LOADING';
export const POST_STATE_PRODUCTS_SUCCESS = 'POST_STATE_PRODUCTS_SUCCESS';
export const POST_STATE_PRODUCTS_REJECT = 'POST_STATE_PRODUCTS_REJECT';

//* ACTIONS ------------------------------------------------
export const postStateProductsReset = () => ({ type: POST_STATE_PRODUCTS_RESET });
export const postStateProductsLoading = () => ({ type: POST_STATE_PRODUCTS_LOADING });
export const postStateProductsSuccess = (payload) => ({ type: POST_STATE_PRODUCTS_SUCCESS, payload });
export const postStateProductsReject = (payload) => ({ type: POST_STATE_PRODUCTS_REJECT, payload });

//* REQUEST SERVICE ---------------------------------------
export const postStateProductsRequest = async (data, getState) => {
    const options = await withToken({
        method: Methods.POST,
        data,
    }, getState);
    return request(`/api/web/additemstatus`, options);
};
