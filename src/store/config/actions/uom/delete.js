import request, { Methods, withToken } from "../../../../assets/util/request";

//* ACTIONTYPES --------------------------------------------
export const DELETE_UOM_RESET = 'DELETE_UOM_RESET';
export const DELETE_UOM_LOADING = 'DELETE_UOM_LOADING';
export const DELETE_UOM_SUCCESS = 'DELETE_UOM_SUCCESS';
export const DELETE_UOM_REJECT = 'DELETE_UOM_REJECT';

//* ACTIONS ------------------------------------------------
export const deleteUomReset = () => ({ type: DELETE_UOM_RESET });
export const deleteUomLoading = () => ({ type: DELETE_UOM_LOADING });
export const deleteUomSuccess = (payload) => ({ type: DELETE_UOM_SUCCESS, payload });
export const deleteUomReject = (payload) => ({ type: DELETE_UOM_REJECT, payload });

//* REQUEST SERVICE ---------------------------------------
export const deleteUomRequest = async (data, getState) => {
    const options = await withToken({
        method: Methods.DELETE,
        data,
    }, getState);
    return request(`/api/web/deleteuom`, options);
};
