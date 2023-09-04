import request, { Methods, withToken } from "../../../../assets/util/request";

//* ACTIONTYPES --------------------------------------------
export const GET_WAREHOUSE_ID_LOADING = 'GET_WAREHOUSE_ID_LOADING';
export const GET_WAREHOUSE_ID_SUCCESS = 'GET_WAREHOUSE_ID_SUCCESS';
export const GET_WAREHOUSE_ID_REJECT = 'GET_WAREHOUSE_ID_REJECT';

//* ACTIONS ------------------------------------------------
export const getWarehouseIdLoading = () => ({ type: GET_WAREHOUSE_ID_LOADING });
export const getWarehouseIdSuccess = (payload) => ({ type: GET_WAREHOUSE_ID_SUCCESS, payload });
export const getWarehouseIdReject = (payload) => ({ type: GET_WAREHOUSE_ID_REJECT, payload });

//* REQUEST SERVICE ---------------------------------------
export const getWarehouseIdRequest = async (params = {}, getState) => {
    const options = await withToken({
        method: Methods.GET,
        params,
    }, getState);
    return request(`/api/web/getwarehousesbyid`, options);
};
