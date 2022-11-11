import request, { Methods, withToken } from "../../../../assets/util/request";

//* ACTIONTYPES --------------------------------------------
export const REGISTER_LOADING = 'REGISTER_LOADING';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_REJECT = 'REGISTER_REJECT';

//* ACTIONS ------------------------------------------------
export const registerLoading = () => ({ type: REGISTER_LOADING });
export const registerSuccess = (payload) => ({ type: REGISTER_SUCCESS, payload });
export const registerReject = (payload) => ({ type: REGISTER_REJECT, payload });

//* REQUEST SERVICE ---------------------------------------
export const registerRequest = async (data) => {
    const options = await withToken({
        method: Methods.POST,
        data,
    });
    return request(`/api/Web/registernewuser`, options);
};
