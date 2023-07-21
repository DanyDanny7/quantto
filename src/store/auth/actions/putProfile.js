import request, { Methods, withToken } from "../../../assets/util/request";

//* ACTIONTYPES --------------------------------------------
export const PUT_PROFILE_RESET = 'PUT_PROFILE_RESET';
export const PUT_PROFILE_LOADING = 'PUT_PROFILE_LOADING';
export const PUT_PROFILE_SUCCESS = 'PUT_PROFILE_SUCCESS';
export const PUT_PROFILE_REJECT = 'PUT_PROFILE_REJECT';

//* ACTIONS ------------------------------------------------
export const putProfileReset = () => ({ type: PUT_PROFILE_RESET });
export const putProfileLoading = () => ({ type: PUT_PROFILE_LOADING });
export const putProfileSuccess = (payload) => ({ type: PUT_PROFILE_SUCCESS, payload });
export const putProfileReject = (payload) => ({ type: PUT_PROFILE_REJECT, payload });

//* REQUEST SERVICE ---------------------------------------
export const putProfileRequest = async (data, getState) => {
    const options = await withToken({
        method: Methods.PUT,
        data,
    }, getState);
    return request(`/api/web/updateuser`, options);
};
