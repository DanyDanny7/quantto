import {
    putCountReset,
    putCountLoading,
    putCountRequest,
    putCountSuccess,
    putCountReject,
} from "../../actions/putCounts";

export const putCount = (formData) => async (dispatch, getState) => {
    dispatch(putCountLoading());
    try {
        const { data } = await putCountRequest(formData, getState);
        dispatch(putCountSuccess(data))
    } catch (error) {
        dispatch(putCountReject(error))
    }
    setTimeout(() => {
        dispatch(putCountReset())
    }, 3000);
    return Promise.resolve();
};