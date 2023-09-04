import {
    postUomProductReset,
    postUomProductLoading,
    postUomProductRequest,
    postUomProductSuccess,
    postUomProductReject,
} from "../../actions/productuom/post";

export const postUomProduct = (formData) => async (dispatch, getState) => {
    dispatch(postUomProductLoading());
    try {
        const { data } = await postUomProductRequest(formData, getState);
        dispatch(postUomProductSuccess(data))
    } catch (error) {
        dispatch(postUomProductReject(error))
    }
    setTimeout(() => {
        dispatch(postUomProductReset())
    }, 3000);
    return Promise.resolve();
};

