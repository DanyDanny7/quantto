import request, { Methods, withToken } from "../../../../assets/util/request";

//* ACTIONTYPES --------------------------------------------
export const PUT_UOM_PRODUCT_RESET = 'PUT_UOM_PRODUCT_RESET';
export const PUT_UOM_PRODUCT_LOADING = 'PUT_UOM_PRODUCT_LOADING';
export const PUT_UOM_PRODUCT_SUCCESS = 'PUT_UOM_PRODUCT_SUCCESS';
export const PUT_UOM_PRODUCT_REJECT = 'PUT_UOM_PRODUCT_REJECT';

//* ACTIONS ------------------------------------------------
export const putUomProductReset = () => ({ type: PUT_UOM_PRODUCT_RESET });
export const putUomProductLoading = () => ({ type: PUT_UOM_PRODUCT_LOADING });
export const putUomProductSuccess = (payload) => ({ type: PUT_UOM_PRODUCT_SUCCESS, payload });
export const putUomProductReject = (payload) => ({ type: PUT_UOM_PRODUCT_REJECT, payload });

//* REQUEST SERVICE ---------------------------------------
export const putUomProductRequest = async (data, getState) => {
    const options = await withToken({
        method: Methods.PUT,
        data,
    }, getState);
    return request(`/api/web/updateitemsuom`, options);
};
