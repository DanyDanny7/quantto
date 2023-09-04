import request, { Methods, withToken } from "../../../../assets/util/request";

//* ACTIONTYPES --------------------------------------------
export const PUT_UOM_RESET = 'PUT_UOM_RESET';
export const PUT_UOM_LOADING = 'PUT_UOM_LOADING';
export const PUT_UOM_SUCCESS = 'PUT_UOM_SUCCESS';
export const PUT_UOM_REJECT = 'PUT_UOM_REJECT';

//* ACTIONS ------------------------------------------------
export const putUomReset = () => ({ type: PUT_UOM_RESET });
export const putUomLoading = () => ({ type: PUT_UOM_LOADING });
export const putUomSuccess = (payload) => ({ type: PUT_UOM_SUCCESS, payload });
export const putUomReject = (payload) => ({ type: PUT_UOM_REJECT, payload });

//* REQUEST SERVICE ---------------------------------------
export const putUomRequest = async (data, getState) => {
    const options = await withToken({
        method: Methods.PUT,
        data,
    }, getState);
    return request(`/api/web/updateuom`, options);
};