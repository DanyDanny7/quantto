import request, { Methods, withToken } from "../../../../assets/util/request";

//* ACTIONTYPES --------------------------------------------
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';

//* ACTIONS ------------------------------------------------
export const logoutSuccess = () => ({ type: LOGOUT_SUCCESS });


//* REQUEST SERVICE -----------------------------------1----
export const logoutRequest = async (data, getState) => {
    const options = await withToken({
        method: Methods.POST,
        data,
    }, getState);

    return request(`/api/web/logout`, options);
};

