import request, { Methods, withToken } from "../../../../assets/util/request";

//* ACTIONTYPES --------------------------------------------
export const PUT_WAREHOUSE_RESET = 'PUT_WAREHOUSE_RESET';
export const PUT_WAREHOUSE_LOADING = 'PUT_WAREHOUSE_LOADING';
export const PUT_WAREHOUSE_SUCCESS = 'PUT_WAREHOUSE_SUCCESS';
export const PUT_WAREHOUSE_REJECT = 'PUT_WAREHOUSE_REJECT';

//* ACTIONS ------------------------------------------------
export const putWarehouseReset = () => ({ type: PUT_WAREHOUSE_RESET });
export const putWarehouseLoading = () => ({ type: PUT_WAREHOUSE_LOADING });
export const putWarehouseSuccess = (payload) => ({ type: PUT_WAREHOUSE_SUCCESS, payload });
export const putWarehouseReject = (payload) => ({ type: PUT_WAREHOUSE_REJECT, payload });

//* REQUEST SERVICE ---------------------------------------
export const putWarehouseRequest = async (data, getState) => {
    const options = await withToken({
        method: Methods.PUT,
        data,
    }, getState);
    return request(`/api/web/updatewarehouses`, options);
};

