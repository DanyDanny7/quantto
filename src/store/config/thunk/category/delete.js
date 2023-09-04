import {
    deleteCategoryReset,
    deleteCategoryLoading,
    deleteCategoryRequest,
    deleteCategorySuccess,
    deleteCategoryReject,
} from "../../actions/subCategory/delete";

export const deleteCategory = (formData) => async (dispatch, getState) => {
    dispatch(deleteCategoryLoading());
    try {
        const { data } = await deleteCategoryRequest(formData, getState);
        dispatch(deleteCategorySuccess(data))
    } catch (error) {
        dispatch(deleteCategoryReject(error))
    }
    setTimeout(() => {
        dispatch(deleteCategoryReset())
    }, 3000);
    return Promise.resolve();
};

