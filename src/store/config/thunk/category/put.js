import {
    putCategoryReset,
    putCategoryLoading,
    putCategoryRequest,
    putCategorySuccess,
    putCategoryReject,
} from "../../actions/category/put";

export const putCategory = (formData) => async (dispatch, getState) => {
    dispatch(putCategoryLoading());
    try {
        const { data } = await putCategoryRequest(formData, getState);
        dispatch(putCategorySuccess(data))
    } catch (error) {
        dispatch(putCategoryReject(error))
    }
    setTimeout(() => {
        dispatch(putCategoryReset())
    }, 3000);
    return Promise.resolve();
};

