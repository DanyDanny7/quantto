import request, { Methods, withToken } from "../../../../assets/util/request";

//* ACTIONTYPES --------------------------------------------
export const DELETE_SUB_CATEGORY_RESET = 'DELETE_SUB_CATEGORY_RESET';
export const DELETE_SUB_CATEGORY_LOADING = 'DELETE_SUB_CATEGORY_LOADING';
export const DELETE_SUB_CATEGORY_SUCCESS = 'DELETE_SUB_CATEGORY_SUCCESS';
export const DELETE_SUB_CATEGORY_REJECT = 'DELETE_SUB_CATEGORY_REJECT';

//* ACTIONS ------------------------------------------------
export const deleteSubCategoryReset = () => ({ type: DELETE_SUB_CATEGORY_RESET });
export const deleteSubCategoryLoading = () => ({ type: DELETE_SUB_CATEGORY_LOADING });
export const deleteSubCategorySuccess = (payload) => ({ type: DELETE_SUB_CATEGORY_SUCCESS, payload });
export const deleteSubCategoryReject = (payload) => ({ type: DELETE_SUB_CATEGORY_REJECT, payload });

//* REQUEST SERVICE ---------------------------------------
export const deleteSubCategoryRequest = async (data, getState) => {
    const options = await withToken({
        method: Methods.DELETE,
        data,
    }, getState);
    return request(`/api/web/deletesubcategories`, options);
};
