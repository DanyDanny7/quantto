import request, { Methods, withToken } from "../../../../assets/util/request";

//* ACTIONTYPES --------------------------------------------
export const GET_LOCATION_LOADING = 'GET_LOCATION_LOADING';
export const GET_LOCATION_SUCCESS = 'GET_LOCATION_SUCCESS';
export const GET_LOCATION_REJECT = 'GET_LOCATION_REJECT';

//* ACTIONS ------------------------------------------------
export const getLocationLoading = () => ({ type: GET_LOCATION_LOADING });
export const getLocationSuccess = (payload) => ({ type: GET_LOCATION_SUCCESS, payload });
export const getLocationReject = (payload) => ({ type: GET_LOCATION_REJECT, payload });

//* REQUEST SERVICE ---------------------------------------
export const getLocationRequest = async (params = {}, getState) => {
    const options = await withToken({
        method: Methods.GET,
        params,
    }, getState);
    return request(`/api/web/getlocations`, options);
};
