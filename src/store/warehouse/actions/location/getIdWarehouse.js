import request, { Methods, withToken } from "../../../../assets/util/request";

//* ACTIONTYPES --------------------------------------------
export const GET_LOCATION_ID_WAREHOUSE_LOADING = 'GET_LOCATION_ID_WAREHOUSE_LOADING';
export const GET_LOCATION_ID_WAREHOUSE_SUCCESS = 'GET_LOCATION_ID_WAREHOUSE_SUCCESS';
export const GET_LOCATION_ID_WAREHOUSE_REJECT = 'GET_LOCATION_ID_WAREHOUSE_REJECT';

//* ACTIONS ------------------------------------------------
export const getLocationIdWarehouseLoading = () => ({ type: GET_LOCATION_ID_WAREHOUSE_LOADING });
export const getLocationIdWarehouseSuccess = (payload) => ({ type: GET_LOCATION_ID_WAREHOUSE_SUCCESS, payload });
export const getLocationIdWarehouseReject = (payload) => ({ type: GET_LOCATION_ID_WAREHOUSE_REJECT, payload });

//* REQUEST SERVICE ---------------------------------------
export const getLocationIdWarehouseRequest = async (params = {}, getState) => {
    const options = await withToken({
        method: Methods.GET,
        params,
    }, getState);
    return request(`/api/web/getlocationsbyidwarehouse`, options);
};
