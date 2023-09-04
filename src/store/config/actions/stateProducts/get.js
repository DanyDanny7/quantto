import request, { Methods, withToken } from "../../../../assets/util/request";

//* ACTIONTYPES --------------------------------------------
export const GET_STATE_PRODUCTS_LOADING = 'GET_STATE_PRODUCTS_LOADING';
export const GET_STATE_PRODUCTS_SUCCESS = 'GET_STATE_PRODUCTS_SUCCESS';
export const GET_STATE_PRODUCTS_REJECT = 'GET_STATE_PRODUCTS_REJECT';

//* ACTIONS ------------------------------------------------
export const getStateProductsLoading = () => ({ type: GET_STATE_PRODUCTS_LOADING });
export const getStateProductsSuccess = (payload) => ({ type: GET_STATE_PRODUCTS_SUCCESS, payload });
export const getStateProductsReject = (payload) => ({ type: GET_STATE_PRODUCTS_REJECT, payload });

//* REQUEST SERVICE ---------------------------------------
export const getStateProductsRequest = async (params = {}, getState) => {
    const options = await withToken({
        method: Methods.GET,
        params,
    }, getState);
    return request(`/api/web/getitemstatus`, options);
};
