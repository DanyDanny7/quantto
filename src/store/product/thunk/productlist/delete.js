import {
    deleteListProductReset,
    deleteListProductLoading,
    deleteListProductRequest,
    deleteListProductSuccess,
    deleteListProductReject,
} from "../../actions/productlist/delete";

export const deleteListProduct = (formData) => async (dispatch, getState) => {
    dispatch(deleteListProductLoading());
    try {
        const { data } = await deleteListProductRequest(formData, getState);
        dispatch(deleteListProductSuccess(data))
    } catch (error) {
        dispatch(deleteListProductReject(error))
    }
    setTimeout(() => {
        dispatch(deleteListProductReset())
    }, 3000);
    return Promise.resolve();
};

