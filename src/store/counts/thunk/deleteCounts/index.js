import {
    deleteCountReset,
    deleteCountLoading,
    deleteCountRequest,
    deleteCountSuccess,
    deleteCountReject,
} from "../../actions/deleteCounts";

export const deleteCount = (formData) => async (dispatch, getState) => {
    dispatch(deleteCountLoading());
    try {
        const { data } = await deleteCountRequest(formData, getState);
        dispatch(deleteCountSuccess(data))
    } catch (error) {
        dispatch(deleteCountReject(error))
    }
    setTimeout(() => {
        dispatch(deleteCountReset())
    }, 10000);
    return Promise.resolve();
};