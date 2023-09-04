import request, { Methods, withToken } from "../../../../assets/util/request";

//* ACTIONTYPES --------------------------------------------
export const DELETE_LOCATION_RESET = 'DELETE_LOCATION_RESET';
export const DELETE_LOCATION_LOADING = 'DELETE_LOCATION_LOADING';
export const DELETE_LOCATION_SUCCESS = 'DELETE_LOCATION_SUCCESS';
export const DELETE_LOCATION_REJECT = 'DELETE_LOCATION_REJECT';

//* ACTIONS ------------------------------------------------
export const deleteLocationReset = () => ({ type: DELETE_LOCATION_RESET });
export const deleteLocationLoading = () => ({ type: DELETE_LOCATION_LOADING });
export const deleteLocationSuccess = (payload) => ({ type: DELETE_LOCATION_SUCCESS, payload });
export const deleteLocationReject = (payload) => ({ type: DELETE_LOCATION_REJECT, payload });

//* REQUEST SERVICE ---------------------------------------
export const deleteLocationRequest = async (data, getState) => {
    const options = await withToken({
        method: Methods.DELETE,
        data,
    }, getState);
    return request(`/api/web/deletelocations`, options);
};