import {
    putListProductReset,
    putListProductLoading,
    putListProductRequest,
    putListProductSuccess,
    putListProductReject,
} from "../../actions/productlist/put";

export const putListProduct = (formData) => async (dispatch, getState) => {
    dispatch(putListProductLoading());
    try {
        const { data } = await putListProductRequest(formData, getState);
        dispatch(putListProductSuccess(data))
    } catch (error) {
        dispatch(putListProductReject(error))
    }
    setTimeout(() => {
        dispatch(putListProductReset())
    }, 3000);
    return Promise.resolve();
};

