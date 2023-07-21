import request, { Methods, withToken } from "../../../assets/util/request";
import { get } from "lodash";

//* ACTIONTYPES --------------------------------------------
export const POST_VALIDATE_EMAIL_RESET = 'POST_VALIDATE_EMAIL_RESET';
export const POST_VALIDATE_EMAIL_LOADING = 'POST_VALIDATE_EMAIL_LOADING';
export const POST_VALIDATE_EMAIL_SUCCESS = 'POST_VALIDATE_EMAIL_SUCCESS';
export const POST_VALIDATE_EMAIL_REJECT = 'POST_VALIDATE_EMAIL_REJECT';

//* ACTIONS ------------------------------------------------
export const postValidateEmailReset = () => ({ type: POST_VALIDATE_EMAIL_RESET });
export const postValidateEmailLoading = () => ({ type: POST_VALIDATE_EMAIL_LOADING });
export const postValidateEmailSuccess = (payload) => ({ type: POST_VALIDATE_EMAIL_SUCCESS, payload });
export const postValidateEmailReject = (payload) => ({ type: POST_VALIDATE_EMAIL_REJECT, payload });

//* REQUEST SERVICE ---------------------------------------
export const postValidateEmailRequest = async (data, getState) => {
    const options = await withToken({
        method: Methods.POST,
        data,
    }, getState);
    return request(`/api/web/validatenewuser/${get(data, "token")}`, options);
};


