import request, { Methods, withToken } from "../../../../assets/util/request";

//* ACTIONTYPES --------------------------------------------
export const GET_LIST_PRODUCT_LOADING = 'GET_LIST_PRODUCT_LOADING';
export const GET_LIST_PRODUCT_SUCCESS = 'GET_LIST_PRODUCT_SUCCESS';
export const GET_LIST_PRODUCT_REJECT = 'GET_LIST_PRODUCT_REJECT';

//* ACTIONS ------------------------------------------------
export const getListProductLoading = () => ({ type: GET_LIST_PRODUCT_LOADING });
export const getListProductSuccess = (payload) => ({ type: GET_LIST_PRODUCT_SUCCESS, payload });
export const getListProductReject = (payload) => ({ type: GET_LIST_PRODUCT_REJECT, payload });

//* REQUEST SERVICE ---------------------------------------
export const getListProductRequest = async (params = {}, getState) => {
    const options = await withToken({
        method: Methods.GET,
        params,
    }, getState);
    return request(`/api/web/getitems`, options);
};
