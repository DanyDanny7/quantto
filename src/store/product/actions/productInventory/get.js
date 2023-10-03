import request, { Methods, withToken } from "../../../../assets/util/request";

//* ACTIONTYPES --------------------------------------------
export const GET_INVENTORY_PRODUCT_CLEAR = 'GET_INVENTORY_PRODUCT_CLEAR';
export const GET_INVENTORY_PRODUCT_LOADING = 'GET_INVENTORY_PRODUCT_LOADING';
export const GET_INVENTORY_PRODUCT_SUCCESS = 'GET_INVENTORY_PRODUCT_SUCCESS';
export const GET_INVENTORY_PRODUCT_REJECT = 'GET_INVENTORY_PRODUCT_REJECT';

//* ACTIONS ------------------------------------------------
export const getInventoryProductClear = () => ({ type: GET_INVENTORY_PRODUCT_CLEAR });
export const getInventoryProductLoading = () => ({ type: GET_INVENTORY_PRODUCT_LOADING });
export const getInventoryProductSuccess = (payload) => ({ type: GET_INVENTORY_PRODUCT_SUCCESS, payload });
export const getInventoryProductReject = (payload) => ({ type: GET_INVENTORY_PRODUCT_REJECT, payload });

//* REQUEST SERVICE ---------------------------------------
export const getInventoryProductRequest = async (params = {}, getState) => {
    const options = await withToken({
        method: Methods.GET,
        params,
    }, getState);
    return request(`/api/web/getavailableinventory`, options);
};
