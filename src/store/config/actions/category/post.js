import request, { Methods, withToken } from "../../../../assets/util/request";

//* ACTIONTYPES --------------------------------------------
export const POST_CATEGORY_RESET = 'POST_CATEGORY_RESET';
export const POST_CATEGORY_LOADING = 'POST_CATEGORY_LOADING';
export const POST_CATEGORY_SUCCESS = 'POST_CATEGORY_SUCCESS';
export const POST_CATEGORY_REJECT = 'POST_CATEGORY_REJECT';

//* ACTIONS ------------------------------------------------
export const postCategoryReset = () => ({ type: POST_CATEGORY_RESET });
export const postCategoryLoading = () => ({ type: POST_CATEGORY_LOADING });
export const postCategorySuccess = (payload) => ({ type: POST_CATEGORY_SUCCESS, payload });
export const postCategoryReject = (payload) => ({ type: POST_CATEGORY_REJECT, payload });

//* REQUEST SERVICE ---------------------------------------
export const postCategoryRequest = async (data, getState) => {
    const options = await withToken({
        method: Methods.POST,
        data,
    }, getState);
    return request(`/api/web/addcategories`, options);
};
