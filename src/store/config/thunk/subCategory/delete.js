import {
    deleteSubCategoryReset,
    deleteSubCategoryLoading,
    deleteSubCategoryRequest,
    deleteSubCategorySuccess,
    deleteSubCategoryReject,
} from "../../actions/subCategory/delete";

export const deleteSubCategory = (formData) => async (dispatch, getState) => {
    dispatch(deleteSubCategoryLoading());
    try {
        const { data } = await deleteSubCategoryRequest(formData, getState);
        dispatch(deleteSubCategorySuccess(data))
    } catch (error) {
        dispatch(deleteSubCategoryReject(error))
    }
    setTimeout(() => {
        dispatch(deleteSubCategoryReset())
    }, 3000);
    return Promise.resolve();
};

