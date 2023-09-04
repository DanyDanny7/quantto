import request, { Methods, withToken } from "../../../../assets/util/request";

//* ACTIONTYPES --------------------------------------------
export const POST_WAREHOUSE_RESET = 'POST_WAREHOUSE_RESET';
export const POST_WAREHOUSE_LOADING = 'POST_WAREHOUSE_LOADING';
export const POST_WAREHOUSE_SUCCESS = 'POST_WAREHOUSE_SUCCESS';
export const POST_WAREHOUSE_REJECT = 'POST_WAREHOUSE_REJECT';

//* ACTIONS ------------------------------------------------
export const postWarehouseReset = () => ({ type: POST_WAREHOUSE_RESET });
export const postWarehouseLoading = () => ({ type: POST_WAREHOUSE_LOADING });
export const postWarehouseSuccess = (payload) => ({ type: POST_WAREHOUSE_SUCCESS, payload });
export const postWarehouseReject = (payload) => ({ type: POST_WAREHOUSE_REJECT, payload });

//* REQUEST SERVICE ---------------------------------------
export const postWarehouseRequest = async (data, getState) => {
    const options = await withToken({
        method: Methods.POST,
        data,
    }, getState);
    return request(`/api/web/addwarehouses`, options);
};
