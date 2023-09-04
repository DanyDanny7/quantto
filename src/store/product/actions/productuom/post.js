import request, { Methods, withToken } from "../../../../assets/util/request";

//* ACTIONTYPES --------------------------------------------
export const POST_UOM_PRODUCT_RESET = 'POST_UOM_PRODUCT_RESET';
export const POST_UOM_PRODUCT_LOADING = 'POST_UOM_PRODUCT_LOADING';
export const POST_UOM_PRODUCT_SUCCESS = 'POST_UOM_PRODUCT_SUCCESS';
export const POST_UOM_PRODUCT_REJECT = 'POST_UOM_PRODUCT_REJECT';

//* ACTIONS ------------------------------------------------
export const postUomProductReset = () => ({ type: POST_UOM_PRODUCT_RESET });
export const postUomProductLoading = () => ({ type: POST_UOM_PRODUCT_LOADING });
export const postUomProductSuccess = (payload) => ({ type: POST_UOM_PRODUCT_SUCCESS, payload });
export const postUomProductReject = (payload) => ({ type: POST_UOM_PRODUCT_REJECT, payload });

//* REQUEST SERVICE ---------------------------------------
export const postUomProductRequest = async (data, getState) => {
    const options = await withToken({
        method: Methods.POST,
        data,
    }, getState);
    return request(`/api/web/additemsuom`, options);
};
