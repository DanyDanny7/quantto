import request, { Methods, withToken } from "../../../../assets/util/request";

//* ACTIONTYPES --------------------------------------------
export const PUT_LOCATION_RESET = 'PUT_LOCATION_RESET';
export const PUT_LOCATION_LOADING = 'PUT_LOCATION_LOADING';
export const PUT_LOCATION_SUCCESS = 'PUT_LOCATION_SUCCESS';
export const PUT_LOCATION_REJECT = 'PUT_LOCATION_REJECT';

//* ACTIONS ------------------------------------------------
export const putLocationReset = () => ({ type: PUT_LOCATION_RESET });
export const putLocationLoading = () => ({ type: PUT_LOCATION_LOADING });
export const putLocationSuccess = (payload) => ({ type: PUT_LOCATION_SUCCESS, payload });
export const putLocationReject = (payload) => ({ type: PUT_LOCATION_REJECT, payload });

//* REQUEST SERVICE ---------------------------------------
export const putLocationRequest = async (data, getState) => {
    const options = await withToken({
        method: Methods.PUT,
        data,
    }, getState);
    return request(`/api/web/updatelocations`, options);
};
