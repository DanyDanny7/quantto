import {
    getListProductLoading,
    getListProductRequest,
    getListProductSuccess,
    getListProductReject,
} from "../../actions/productlist/get";

export const getListProduct = (formData) => async (dispatch, getState) => {
    dispatch(getListProductLoading());
    try {
        const { data } = await getListProductRequest(formData, getState);
        dispatch(getListProductSuccess(data))
    } catch (error) {
        dispatch(getListProductReject(error))
    }
    return Promise.resolve();
};