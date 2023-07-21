import {
    deleteInventaryCountReset,
    deleteInventaryCountLoading,
    deleteInventaryCountRequest,
    deleteInventaryCountSuccess,
    deleteInventaryCountReject,
} from "../../../actions/inventary/counts/deleteCounts";

export const deleteInventaryCount = (formData) => async (dispatch, getState) => {
    dispatch(deleteInventaryCountLoading());
    try {
        const { data } = await deleteInventaryCountRequest(formData, getState);
        dispatch(deleteInventaryCountSuccess(data))
    } catch (error) {
        dispatch(deleteInventaryCountReject(error))
    }
    setTimeout(() => {
        dispatch(deleteInventaryCountReset())
    }, 10000);
    return Promise.resolve();
};