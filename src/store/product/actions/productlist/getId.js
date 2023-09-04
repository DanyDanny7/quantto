import request, { Methods, withToken } from "../../../../assets/util/request";

//* ACTIONTYPES --------------------------------------------
export const GET_LIST_PRODUCT_ID_LOADING = 'GET_LIST_PRODUCT_ID_LOADING';
export const GET_LIST_PRODUCT_ID_SUCCESS = 'GET_LIST_PRODUCT_ID_SUCCESS';
export const GET_LIST_PRODUCT_ID_REJECT = 'GET_LIST_PRODUCT_ID_REJECT';

//* ACTIONS ------------------------------------------------
export const getListProductIdLoading = () => ({ type: GET_LIST_PRODUCT_ID_LOADING });
export const getListProductIdSuccess = (payload) => ({ type: GET_LIST_PRODUCT_ID_SUCCESS, payload });
export const getListProductIdReject = (payload) => ({ type: GET_LIST_PRODUCT_ID_REJECT, payload });

//* REQUEST SERVICE ---------------------------------------
export const getListProductIdRequest = async (params = {}, getState) => {
    const options = await withToken({
        method: Methods.GET,
        params,
    }, getState);
    return request(`/api/web/getitemsbyid`, options);
};


