import request, { Methods, withToken } from "../../../../assets/util/request";

//* ACTIONTYPES --------------------------------------------
export const LOGIN_LOADING = 'LOGIN_LOADING';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_REJECT = 'LOGIN_REJECT';

export const UPDATE_DATA = 'UPDATE_DATA';

//* ACTIONS ------------------------------------------------
export const loginLoading = () => ({ type: LOGIN_LOADING });
export const loginSuccess = (payload) => ({ type: LOGIN_SUCCESS, payload });
export const loginReject = (payload) => ({ type: LOGIN_REJECT, payload });

export const updateData = (payload) => ({ type: UPDATE_DATA, payload });

//* REQUEST SERVICE ---------------------------------------
export const loginRequest = async (data, getState) => {
    const options = await withToken({
        method: Methods.POST,
        data,
    }, getState);
    return request(`/api/web/login`, options);
};
