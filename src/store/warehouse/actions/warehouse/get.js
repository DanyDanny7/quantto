import request, { Methods, withToken } from "../../../../assets/util/request";

//* ACTIONTYPES --------------------------------------------
export const GET_WAREHOUSE_LOADING = 'GET_WAREHOUSE_LOADING';
export const GET_WAREHOUSE_SUCCESS = 'GET_WAREHOUSE_SUCCESS';
export const GET_WAREHOUSE_REJECT = 'GET_WAREHOUSE_REJECT';

//* ACTIONS ------------------------------------------------
export const getWarehouseLoading = () => ({ type: GET_WAREHOUSE_LOADING });
export const getWarehouseSuccess = (payload) => ({ type: GET_WAREHOUSE_SUCCESS, payload });
export const getWarehouseReject = (payload) => ({ type: GET_WAREHOUSE_REJECT, payload });

//* REQUEST SERVICE ---------------------------------------
export const getWarehouseRequest = async (params = {}, getState) => {
    const options = await withToken({
        method: Methods.GET,
        params,
    }, getState);
    return request(`/api/web/getwarehouses`, options);
};
