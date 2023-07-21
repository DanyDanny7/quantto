import request, { Methods, withToken } from "../../../assets/util/request";

//* ACTIONTYPES --------------------------------------------
export const GET_VALIDATE_EMAIL_RESET = 'GET_VALIDATE_EMAIL_RESET';
export const GET_VALIDATE_EMAIL_LOADING = 'GET_VALIDATE_EMAIL_LOADING';
export const GET_VALIDATE_EMAIL_SUCCESS = 'GET_VALIDATE_EMAIL_SUCCESS';
export const GET_VALIDATE_EMAIL_REJECT = 'GET_VALIDATE_EMAIL_REJECT';

//* ACTIONS ------------------------------------------------
export const getValidateEmailReset = () => ({ type: GET_VALIDATE_EMAIL_RESET });
export const getValidateEmailLoading = () => ({ type: GET_VALIDATE_EMAIL_LOADING });
export const getValidateEmailSuccess = (payload) => ({ type: GET_VALIDATE_EMAIL_SUCCESS, payload });
export const getValidateEmailReject = (payload) => ({ type: GET_VALIDATE_EMAIL_REJECT, payload });

//* REQUEST SERVICE ---------------------------------------
export const getValidateEmailRequest = async (data, getState) => {
    const options = await withToken({
        method: Methods.GET,
        data,
    }, getState);
    return request(`/api/web/getusertoresendemail`, options);
};


