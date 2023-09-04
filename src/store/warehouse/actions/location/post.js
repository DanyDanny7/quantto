import request, { Methods, withToken } from "../../../../assets/util/request";

//* ACTIONTYPES --------------------------------------------
export const POST_LOCATION_RESET = 'POST_LOCATION_RESET';
export const POST_LOCATION_LOADING = 'POST_LOCATION_LOADING';
export const POST_LOCATION_SUCCESS = 'POST_LOCATION_SUCCESS';
export const POST_LOCATION_REJECT = 'POST_LOCATION_REJECT';

//* ACTIONS ------------------------------------------------
export const postLocationReset = () => ({ type: POST_LOCATION_RESET });
export const postLocationLoading = () => ({ type: POST_LOCATION_LOADING });
export const postLocationSuccess = (payload) => ({ type: POST_LOCATION_SUCCESS, payload });
export const postLocationReject = (payload) => ({ type: POST_LOCATION_REJECT, payload });

//* REQUEST SERVICE ---------------------------------------
export const postLocationRequest = async (data, getState) => {
    const options = await withToken({
        method: Methods.POST,
        data,
    }, getState);
    return request(`/api/web/addlocations`, options);
};
