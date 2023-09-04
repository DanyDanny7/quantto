import {
    putSubCategoryReset,
    putSubCategoryLoading,
    putSubCategoryRequest,
    putSubCategorySuccess,
    putSubCategoryReject,
} from "../../actions/subCategory/put";

export const putSubCategory = (formData) => async (dispatch, getState) => {
    dispatch(putSubCategoryLoading());
    try {
        const { data } = await putSubCategoryRequest(formData, getState);
        dispatch(putSubCategorySuccess(data))
    } catch (error) {
        dispatch(putSubCategoryReject(error))
    }
    setTimeout(() => {
        dispatch(putSubCategoryReset())
    }, 3000);
    return Promise.resolve();
};

