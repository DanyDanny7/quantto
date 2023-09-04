import request, { Methods, withToken } from "../../../../assets/util/request";

//* ACTIONTYPES --------------------------------------------
export const GET_STATE_PRODUCTS_ID_LOADING = 'GET_STATE_PRODUCTS_ID_LOADING';
export const GET_STATE_PRODUCTS_ID_SUCCESS = 'GET_STATE_PRODUCTS_ID_SUCCESS';
export const GET_STATE_PRODUCTS_ID_REJECT = 'GET_STATE_PRODUCTS_ID_REJECT';

//* ACTIONS ------------------------------------------------
export const getStateProductsIdLoading = () => ({ type: GET_STATE_PRODUCTS_ID_LOADING });
export const getStateProductsIdSuccess = (payload) => ({ type: GET_STATE_PRODUCTS_ID_SUCCESS, payload });
export const getStateProductsIdReject = (payload) => ({ type: GET_STATE_PRODUCTS_ID_REJECT, payload });

//* REQUEST SERVICE ---------------------------------------
export const getStateProductsIdRequest = async (params = {}, getState) => {
    const options = await withToken({
        method: Methods.GET,
        params,
    }, getState);
    return request(`/api/web/getitemstatusbyid`, options);
};
