import {
    getCategoryLoading,
    getCategoryRequest,
    getCategorySuccess,
    getCategoryReject,
} from "../../actions/category/get";

export const getCategory = (formData) => async (dispatch, getState) => {
    dispatch(getCategoryLoading());
    try {
        const { data } = await getCategoryRequest(formData, getState);
        dispatch(getCategorySuccess(data))
    } catch (error) {
        dispatch(getCategoryReject(error))
    }
    return Promise.resolve();
};