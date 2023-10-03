import {
    getInventoryProductClear,
    getInventoryProductLoading,
    getInventoryProductRequest,
    getInventoryProductSuccess,
    getInventoryProductReject,
} from "../../actions/productInventory/get";

export const getInventoryProduct = (formData) => async (dispatch, getState) => {
    dispatch(getInventoryProductLoading());
    try {
        const { data } = await getInventoryProductRequest(formData, getState);
        dispatch(getInventoryProductSuccess(data))
    } catch (error) {
        dispatch(getInventoryProductReject(error))
    }
    return Promise.resolve();
};

export const getInventoryProdClear = () => async (dispatch, getState) => {
    dispatch(getInventoryProductClear());
    return Promise.resolve();
};