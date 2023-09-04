import request, { Methods, withToken } from "../../../../assets/util/request";

//* ACTIONTYPES --------------------------------------------
export const DELETE_LIST_PRODUCT_RESET = 'DELETE_LIST_PRODUCT_RESET';
export const DELETE_LIST_PRODUCT_LOADING = 'DELETE_LIST_PRODUCT_LOADING';
export const DELETE_LIST_PRODUCT_SUCCESS = 'DELETE_LIST_PRODUCT_SUCCESS';
export const DELETE_LIST_PRODUCT_REJECT = 'DELETE_LIST_PRODUCT_REJECT';

//* ACTIONS ------------------------------------------------
export const deleteListProductReset = () => ({ type: DELETE_LIST_PRODUCT_RESET });
export const deleteListProductLoading = () => ({ type: DELETE_LIST_PRODUCT_LOADING });
export const deleteListProductSuccess = (payload) => ({ type: DELETE_LIST_PRODUCT_SUCCESS, payload });
export const deleteListProductReject = (payload) => ({ type: DELETE_LIST_PRODUCT_REJECT, payload });

//* REQUEST SERVICE ---------------------------------------
export const deleteListProductRequest = async (data, getState) => {
    const options = await withToken({
        method: Methods.DELETE,
        data,
    }, getState);
    return request(`/api/web/deleteitems`, options);
};
