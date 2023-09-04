import request, { Methods, withToken } from "../../../../assets/util/request";

//* ACTIONTYPES --------------------------------------------
export const GET_SUB_CATEGORY_LOADING = 'GET_SUB_CATEGORY_LOADING';
export const GET_SUB_CATEGORY_SUCCESS = 'GET_SUB_CATEGORY_SUCCESS';
export const GET_SUB_CATEGORY_REJECT = 'GET_SUB_CATEGORY_REJECT';

//* ACTIONS ------------------------------------------------
export const getSubCategoryLoading = () => ({ type: GET_SUB_CATEGORY_LOADING });
export const getSubCategorySuccess = (payload) => ({ type: GET_SUB_CATEGORY_SUCCESS, payload });
export const getSubCategoryReject = (payload) => ({ type: GET_SUB_CATEGORY_REJECT, payload });

//* REQUEST SERVICE ---------------------------------------
export const getSubCategoryRequest = async (params = {}, getState) => {
    const options = await withToken({
        method: Methods.GET,
        params,
    }, getState);
    return request(`/api/web/getsubcategories`, options);
};
