import {
    postImgProductReset,
    postImgProductLoading,
    postImgProductRequest,
    postImgProductSuccess,
    postImgProductReject,
} from "../../actions/productimg/post";

export const postImgProduct = (formData) => async (dispatch, getState) => {
    dispatch(postImgProductLoading());
    try {
        const { data } = await postImgProductRequest(formData, getState);
        dispatch(postImgProductSuccess(data))
    } catch (error) {
        dispatch(postImgProductReject(error))
    }
    setTimeout(() => {
        dispatch(postImgProductReset())
    }, 3000);
    return Promise.resolve();
};

