import request, { Methods, withToken } from "../../../../assets/util/request";

//* ACTIONTYPES --------------------------------------------
export const GET_CATEGORY_ID_LOADING = 'GET_CATEGORY_ID_LOADING';
export const GET_CATEGORY_ID_SUCCESS = 'GET_CATEGORY_ID_SUCCESS';
export const GET_CATEGORY_ID_REJECT = 'GET_CATEGORY_ID_REJECT';

//* ACTIONS ------------------------------------------------
export const getCategoryIdLoading = () => ({ type: GET_CATEGORY_ID_LOADING });
export const getCategoryIdSuccess = (payload) => ({ type: GET_CATEGORY_ID_SUCCESS, payload });
export const getCategoryIdReject = (payload) => ({ type: GET_CATEGORY_ID_REJECT, payload });

//* REQUEST SERVICE ---------------------------------------
export const getCategoryIdRequest = async (params = {}, getState) => {
    const options = await withToken({
        method: Methods.GET,
        params,
    }, getState);
    return request(`/api/web/getcategoriesbyid`, options);
};