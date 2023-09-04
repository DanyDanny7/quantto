import {
    deleteImgProductReset,
    deleteImgProductLoading,
    deleteImgProductRequest,
    deleteImgProductSuccess,
    deleteImgProductReject,
} from "../../actions/productimg/delete";

export const deleteImgProduct = (formData) => async (dispatch, getState) => {
    dispatch(deleteImgProductLoading());
    try {
        const { data } = await deleteImgProductRequest(formData, getState);
        dispatch(deleteImgProductSuccess(data))
    } catch (error) {
        dispatch(deleteImgProductReject(error))
    }
    setTimeout(() => {
        dispatch(deleteImgProductReset())
    }, 3000);
    return Promise.resolve();
};

