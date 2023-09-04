import request, { Methods, withToken } from "../../../../assets/util/request";

//* ACTIONTYPES --------------------------------------------
export const DELETE_WAREHOUSE_RESET = 'DELETE_WAREHOUSE_RESET';
export const DELETE_WAREHOUSE_LOADING = 'DELETE_WAREHOUSE_LOADING';
export const DELETE_WAREHOUSE_SUCCESS = 'DELETE_WAREHOUSE_SUCCESS';
export const DELETE_WAREHOUSE_REJECT = 'DELETE_WAREHOUSE_REJECT';

//* ACTIONS ------------------------------------------------
export const deleteWarehouseReset = () => ({ type: DELETE_WAREHOUSE_RESET });
export const deleteWarehouseLoading = () => ({ type: DELETE_WAREHOUSE_LOADING });
export const deleteWarehouseSuccess = (payload) => ({ type: DELETE_WAREHOUSE_SUCCESS, payload });
export const deleteWarehouseReject = (payload) => ({ type: DELETE_WAREHOUSE_REJECT, payload });

//* REQUEST SERVICE ---------------------------------------
export const deleteWarehouseRequest = async (data, getState) => {
    const options = await withToken({
        method: Methods.DELETE,
        data,
    }, getState);
    return request(`/api/web/deletewarehouses`, options);
};

