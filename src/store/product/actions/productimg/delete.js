import request, { Methods, withToken } from "../../../../assets/util/request";

//* ACTIONTYPES --------------------------------------------
export const DELETE_IMG_PRODUCT_RESET = 'DELETE_IMG_PRODUCT_RESET';
export const DELETE_IMG_PRODUCT_LOADING = 'DELETE_IMG_PRODUCT_LOADING';
export const DELETE_IMG_PRODUCT_SUCCESS = 'DELETE_IMG_PRODUCT_SUCCESS';
export const DELETE_IMG_PRODUCT_REJECT = 'DELETE_IMG_PRODUCT_REJECT';

//* ACTIONS ------------------------------------------------
export const deleteImgProductReset = () => ({ type: DELETE_IMG_PRODUCT_RESET });
export const deleteImgProductLoading = () => ({ type: DELETE_IMG_PRODUCT_LOADING });
export const deleteImgProductSuccess = (payload) => ({ type: DELETE_IMG_PRODUCT_SUCCESS, payload });
export const deleteImgProductReject = (payload) => ({ type: DELETE_IMG_PRODUCT_REJECT, payload });

//* REQUEST SERVICE ---------------------------------------
export const deleteImgProductRequest = async (data, getState) => {
    const options = await withToken({
        method: Methods.DELETE,
        data,
    }, getState);
    return request(`/api/web/deleteitemsimages`, options);
};