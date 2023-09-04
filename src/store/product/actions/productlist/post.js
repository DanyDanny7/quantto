import request, { Methods, withToken } from "../../../../assets/util/request";

//* ACTIONTYPES --------------------------------------------
export const POST_LIST_PRODUCT_RESET = 'POST_LIST_PRODUCT_RESET';
export const POST_LIST_PRODUCT_LOADING = 'POST_LIST_PRODUCT_LOADING';
export const POST_LIST_PRODUCT_SUCCESS = 'POST_LIST_PRODUCT_SUCCESS';
export const POST_LIST_PRODUCT_REJECT = 'POST_LIST_PRODUCT_REJECT';

//* ACTIONS ------------------------------------------------
export const postListProductReset = () => ({ type: POST_LIST_PRODUCT_RESET });
export const postListProductLoading = () => ({ type: POST_LIST_PRODUCT_LOADING });
export const postListProductSuccess = (payload) => ({ type: POST_LIST_PRODUCT_SUCCESS, payload });
export const postListProductReject = (payload) => ({ type: POST_LIST_PRODUCT_REJECT, payload });

//* REQUEST SERVICE ---------------------------------------
export const postListProductRequest = async (data, getState) => {
    const options = await withToken({
        method: Methods.POST,
        data,
    }, getState);
    return request(`/api/web/additems`, options);
};