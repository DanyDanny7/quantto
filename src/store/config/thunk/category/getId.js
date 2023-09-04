import {
    getCategoryIdLoading,
    getCategoryIdRequest,
    getCategoryIdSuccess,
    getCategoryIdReject,
} from "../../actions/category/getId";

export const getCategoryId = (formData) => async (dispatch, getState) => {
    dispatch(getCategoryIdLoading());
    try {
        const { data } = await getCategoryIdRequest(formData, getState);
        dispatch(getCategoryIdSuccess(data))
    } catch (error) {
        dispatch(getCategoryIdReject(error))
    }
    return Promise.resolve();
};