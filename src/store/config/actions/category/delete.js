import request, { Methods, withToken } from "../../../../assets/util/request";

//* ACTIONTYPES --------------------------------------------
export const DELETE_CATEGORY_RESET = 'DELETE_CATEGORY_RESET';
export const DELETE_CATEGORY_LOADING = 'DELETE_CATEGORY_LOADING';
export const DELETE_CATEGORY_SUCCESS = 'DELETE_CATEGORY_SUCCESS';
export const DELETE_CATEGORY_REJECT = 'DELETE_CATEGORY_REJECT';

//* ACTIONS ------------------------------------------------
export const deleteCategoryReset = () => ({ type: DELETE_CATEGORY_RESET });
export const deleteCategoryLoading = () => ({ type: DELETE_CATEGORY_LOADING });
export const deleteCategorySuccess = (payload) => ({ type: DELETE_CATEGORY_SUCCESS, payload });
export const deleteCategoryReject = (payload) => ({ type: DELETE_CATEGORY_REJECT, payload });

//* REQUEST SERVICE ---------------------------------------
export const deleteCategoryRequest = async (data, getState) => {
    const options = await withToken({
        method: Methods.DELETE,
        data,
    }, getState);
    return request(`/api/web/deletecategories`, options);
};
