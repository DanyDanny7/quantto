import request, { Methods, withToken } from "../../../../assets/util/request";

//* ACTIONTYPES --------------------------------------------
export const GET_SUB_CATEGORY_ID_LOADING = 'GET_SUB_CATEGORY_ID_LOADING';
export const GET_SUB_CATEGORY_ID_SUCCESS = 'GET_SUB_CATEGORY_ID_SUCCESS';
export const GET_SUB_CATEGORY_ID_REJECT = 'GET_SUB_CATEGORY_ID_REJECT';

//* ACTIONS ------------------------------------------------
export const getSubCategoryIdLoading = () => ({ type: GET_SUB_CATEGORY_ID_LOADING });
export const getSubCategoryIdSuccess = (payload) => ({ type: GET_SUB_CATEGORY_ID_SUCCESS, payload });
export const getSubCategoryIdReject = (payload) => ({ type: GET_SUB_CATEGORY_ID_REJECT, payload });

//* REQUEST SERVICE ---------------------------------------
export const getSubCategoryIdRequest = async (params = {}, getState) => {
    const options = await withToken({
        method: Methods.GET,
        params,
    }, getState);
    return request(`/api/web/getsubcategoriesbyid`, options);
};

