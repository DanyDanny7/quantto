import request, { Methods, withToken } from "../../../../assets/util/request";

//* ACTIONTYPES --------------------------------------------
export const PUT_CATEGORY_RESET = 'PUT_CATEGORY_RESET';
export const PUT_CATEGORY_LOADING = 'PUT_CATEGORY_LOADING';
export const PUT_CATEGORY_SUCCESS = 'PUT_CATEGORY_SUCCESS';
export const PUT_CATEGORY_REJECT = 'PUT_CATEGORY_REJECT';

//* ACTIONS ------------------------------------------------
export const putCategoryReset = () => ({ type: PUT_CATEGORY_RESET });
export const putCategoryLoading = () => ({ type: PUT_CATEGORY_LOADING });
export const putCategorySuccess = (payload) => ({ type: PUT_CATEGORY_SUCCESS, payload });
export const putCategoryReject = (payload) => ({ type: PUT_CATEGORY_REJECT, payload });

//* REQUEST SERVICE ---------------------------------------
export const putCategoryRequest = async (data, getState) => {
    const options = await withToken({
        method: Methods.PUT,
        data,
    }, getState);
    return request(`/api/web/updatecategories`, options);
};
