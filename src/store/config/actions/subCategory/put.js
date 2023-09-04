import request, { Methods, withToken } from "../../../../assets/util/request";

//* ACTIONTYPES --------------------------------------------
export const PUT_SUB_CATEGORY_RESET = 'PUT_SUB_CATEGORY_RESET';
export const PUT_SUB_CATEGORY_LOADING = 'PUT_SUB_CATEGORY_LOADING';
export const PUT_SUB_CATEGORY_SUCCESS = 'PUT_SUB_CATEGORY_SUCCESS';
export const PUT_SUB_CATEGORY_REJECT = 'PUT_SUB_CATEGORY_REJECT';

//* ACTIONS ------------------------------------------------
export const putSubCategoryReset = () => ({ type: PUT_SUB_CATEGORY_RESET });
export const putSubCategoryLoading = () => ({ type: PUT_SUB_CATEGORY_LOADING });
export const putSubCategorySuccess = (payload) => ({ type: PUT_SUB_CATEGORY_SUCCESS, payload });
export const putSubCategoryReject = (payload) => ({ type: PUT_SUB_CATEGORY_REJECT, payload });

//* REQUEST SERVICE ---------------------------------------
export const putSubCategoryRequest = async (data, getState) => {
    const options = await withToken({
        method: Methods.PUT,
        data,
    }, getState);
    return request(`/api/web/updatesubcategories`, options);
};
