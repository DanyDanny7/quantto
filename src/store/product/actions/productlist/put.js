import request, { Methods, withToken } from "../../../../assets/util/request";

//* ACTIONTYPES --------------------------------------------
export const PUT_LIST_PRODUCT_RESET = 'PUT_LIST_PRODUCT_RESET';
export const PUT_LIST_PRODUCT_LOADING = 'PUT_LIST_PRODUCT_LOADING';
export const PUT_LIST_PRODUCT_SUCCESS = 'PUT_LIST_PRODUCT_SUCCESS';
export const PUT_LIST_PRODUCT_REJECT = 'PUT_LIST_PRODUCT_REJECT';

//* ACTIONS ------------------------------------------------
export const putListProductReset = () => ({ type: PUT_LIST_PRODUCT_RESET });
export const putListProductLoading = () => ({ type: PUT_LIST_PRODUCT_LOADING });
export const putListProductSuccess = (payload) => ({ type: PUT_LIST_PRODUCT_SUCCESS, payload });
export const putListProductReject = (payload) => ({ type: PUT_LIST_PRODUCT_REJECT, payload });

//* REQUEST SERVICE ---------------------------------------
export const putListProductRequest = async (data, getState) => {
    const options = await withToken({
        method: Methods.PUT,
        data,
    }, getState);
    return request(`/api/web/updateitems`, options);
};