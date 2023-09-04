import {
    getSubCategoryLoading,
    getSubCategoryRequest,
    getSubCategorySuccess,
    getSubCategoryReject,
} from "../../actions/subCategory/get";

export const getSubCategory = (formData) => async (dispatch, getState) => {
    dispatch(getSubCategoryLoading());
    try {
        const { data } = await getSubCategoryRequest(formData, getState);
        dispatch(getSubCategorySuccess(data))
    } catch (error) {
        dispatch(getSubCategoryReject(error))
    }
    return Promise.resolve();
};