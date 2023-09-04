import {
    postSubCategoryReset,
    postSubCategoryLoading,
    postSubCategoryRequest,
    postSubCategorySuccess,
    postSubCategoryReject,
} from "../../actions/subCategory/post";

export const postSubCategory = (formData) => async (dispatch, getState) => {
    dispatch(postSubCategoryLoading());
    try {
        const { data } = await postSubCategoryRequest(formData, getState);
        dispatch(postSubCategorySuccess(data))
    } catch (error) {
        dispatch(postSubCategoryReject(error))
    }
    setTimeout(() => {
        dispatch(postSubCategoryReset())
    }, 3000);
    return Promise.resolve();
};

