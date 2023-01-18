import request, { Methods, withToken } from "../../../../assets/util/request";

//* ACTIONTYPES --------------------------------------------
export const DELETE_INVENTARY_PRODUCT_RESET = 'DELETE_INVENTARY_PRODUCT_RESET';
export const DELETE_INVENTARY_PRODUCT_LOADING = 'DELETE_INVENTARY_PRODUCT_LOADING';
export const DELETE_INVENTARY_PRODUCT_SUCCESS = 'DELETE_INVENTARY_PRODUCT_SUCCESS';
export const DELETE_INVENTARY_PRODUCT_REJECT = 'DELETE_INVENTARY_PRODUCT_REJECT';

//* ACTIONS ------------------------------------------------
export const deleteInventaryProductReset = () => ({ type: DELETE_INVENTARY_PRODUCT_RESET });
export const deleteInventaryProductLoading = () => ({ type: DELETE_INVENTARY_PRODUCT_LOADING });
export const deleteInventaryProductSuccess = (payload) => ({ type: DELETE_INVENTARY_PRODUCT_SUCCESS, payload });
export const deleteInventaryProductReject = (payload) => ({ type: DELETE_INVENTARY_PRODUCT_REJECT, payload });

//* REQUEST SERVICE ---------------------------------------
export const deleteInventaryProductRequest = async (data, getState) => {
    const options = await withToken({
        method: Methods.DELETE,
        data,
    }, getState);
    return request(`/api/web/deleteinventorytemplateline`, options);
};


