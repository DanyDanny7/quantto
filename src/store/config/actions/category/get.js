import request, { Methods, withToken } from "../../../../assets/util/request";

//* ACTIONTYPES --------------------------------------------
export const GET_CATEGORY_LOADING = 'GET_CATEGORY_LOADING';
export const GET_CATEGORY_SUCCESS = 'GET_CATEGORY_SUCCESS';
export const GET_CATEGORY_REJECT = 'GET_CATEGORY_REJECT';

//* ACTIONS ------------------------------------------------
export const getCategoryLoading = () => ({ type: GET_CATEGORY_LOADING });
export const getCategorySuccess = (payload) => ({ type: GET_CATEGORY_SUCCESS, payload });
export const getCategoryReject = (payload) => ({ type: GET_CATEGORY_REJECT, payload });

//* REQUEST SERVICE ---------------------------------------
export const getCategoryRequest = async (params = {}, getState) => {
    const options = await withToken({
        method: Methods.GET,
        params,
    }, getState);
    return request(`/api/web/getcategories`, options);
};

