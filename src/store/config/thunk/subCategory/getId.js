import {
    getSubCategoryIdLoading,
    getSubCategoryIdRequest,
    getSubCategoryIdSuccess,
    getSubCategoryIdReject,
} from "../../actions/subCategory/getId";

export const getSubCategoryId = (formData) => async (dispatch, getState) => {
    dispatch(getSubCategoryIdLoading());
    try {
        const { data } = await getSubCategoryIdRequest(formData, getState);
        dispatch(getSubCategoryIdSuccess(data))
    } catch (error) {
        dispatch(getSubCategoryIdReject(error))
    }
    return Promise.resolve();
};