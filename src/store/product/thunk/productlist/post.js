import {
    postListProductReset,
    postListProductLoading,
    postListProductRequest,
    postListProductSuccess,
    postListProductReject,
} from "../../actions/productlist/post";

export const postListProduct = (formData) => async (dispatch, getState) => {
    dispatch(postListProductLoading());
    try {
        const { data } = await postListProductRequest(formData, getState);
        dispatch(postListProductSuccess(data))
    } catch (error) {
        dispatch(postListProductReject(error))
    }
    setTimeout(() => {
        dispatch(postListProductReset())
    }, 3000);
    return Promise.resolve();
};

