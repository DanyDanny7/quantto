import {
    postCategoryReset,
    postCategoryLoading,
    postCategoryRequest,
    postCategorySuccess,
    postCategoryReject,
} from "../../actions/category/post";

export const postCategory = (formData) => async (dispatch, getState) => {
    dispatch(postCategoryLoading());
    try {
        const { data } = await postCategoryRequest(formData, getState);
        dispatch(postCategorySuccess(data))
    } catch (error) {
        dispatch(postCategoryReject(error))
    }
    setTimeout(() => {
        dispatch(postCategoryReset())
    }, 3000);
    return Promise.resolve();
};

