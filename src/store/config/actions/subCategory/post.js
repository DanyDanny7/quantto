import request, { Methods, withToken } from "../../../../assets/util/request";

//* ACTIONTYPES --------------------------------------------
export const POST_SUB_CATEGORY_RESET = 'POST_SUB_CATEGORY_RESET';
export const POST_SUB_CATEGORY_LOADING = 'POST_SUB_CATEGORY_LOADING';
export const POST_SUB_CATEGORY_SUCCESS = 'POST_SUB_CATEGORY_SUCCESS';
export const POST_SUB_CATEGORY_REJECT = 'POST_SUB_CATEGORY_REJECT';

//* ACTIONS ------------------------------------------------
export const postSubCategoryReset = () => ({ type: POST_SUB_CATEGORY_RESET });
export const postSubCategoryLoading = () => ({ type: POST_SUB_CATEGORY_LOADING });
export const postSubCategorySuccess = (payload) => ({ type: POST_SUB_CATEGORY_SUCCESS, payload });
export const postSubCategoryReject = (payload) => ({ type: POST_SUB_CATEGORY_REJECT, payload });

//* REQUEST SERVICE ---------------------------------------
export const postSubCategoryRequest = async (data, getState) => {
    const options = await withToken({
        method: Methods.POST,
        data,
    }, getState);
    return request(`/api/web/addsubcategories`, options);
};
