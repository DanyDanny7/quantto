import request, { Methods, withToken } from "../../../../assets/util/request";

//* ACTIONTYPES --------------------------------------------
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';

//* ACTIONS ------------------------------------------------
export const logoutSuccess = () => ({ type: LOGOUT_SUCCESS });


//* REQUEST SERVICE ---------------------------------------
export const logoutRequest = async (params = {}) => {
    const options = await withToken({
        method: Methods.POST,
        params,
    });

    return request(`/api/web/logout`, options);
};

