import request, { Methods, withToken } from "../../../../assets/util/request";

//* ACTIONTYPES --------------------------------------------
export const GET_UOM_LOADING = 'GET_UOM_LOADING';
export const GET_UOM_SUCCESS = 'GET_UOM_SUCCESS';
export const GET_UOM_REJECT = 'GET_UOM_REJECT';

//* ACTIONS ------------------------------------------------
export const getUomLoading = () => ({ type: GET_UOM_LOADING });
export const getUomSuccess = (payload) => ({ type: GET_UOM_SUCCESS, payload });
export const getUomReject = (payload) => ({ type: GET_UOM_REJECT, payload });

//* REQUEST SERVICE ---------------------------------------
export const getUomRequest = async (params = {}, getState) => {
    const options = await withToken({
        method: Methods.GET,
        params,
    }, getState);
    return request(`/api/web/getuom`, options);
};
