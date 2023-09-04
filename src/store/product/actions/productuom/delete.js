import request, { Methods, withToken } from "../../../../assets/util/request";

//* ACTIONTYPES --------------------------------------------
export const DELETE_UOM_PRODUCT_RESET = 'DELETE_UOM_PRODUCT_RESET';
export const DELETE_UOM_PRODUCT_LOADING = 'DELETE_UOM_PRODUCT_LOADING';
export const DELETE_UOM_PRODUCT_SUCCESS = 'DELETE_UOM_PRODUCT_SUCCESS';
export const DELETE_UOM_PRODUCT_REJECT = 'DELETE_UOM_PRODUCT_REJECT';

//* ACTIONS ------------------------------------------------
export const deleteUomProductReset = () => ({ type: DELETE_UOM_PRODUCT_RESET });
export const deleteUomProductLoading = () => ({ type: DELETE_UOM_PRODUCT_LOADING });
export const deleteUomProductSuccess = (payload) => ({ type: DELETE_UOM_PRODUCT_SUCCESS, payload });
export const deleteUomProductReject = (payload) => ({ type: DELETE_UOM_PRODUCT_REJECT, payload });

//* REQUEST SERVICE ---------------------------------------
export const deleteUomProductRequest = async (data, getState) => {
    const options = await withToken({
        method: Methods.DELETE,
        data,
    }, getState);
    return request(`/api/web/deleteitemsuom`, options);
};

