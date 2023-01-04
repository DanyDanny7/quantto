import {
    putInventaryReCountReset,
    putInventaryReCountLoading,
    putInventaryReCountRequest,
    putInventaryReCountSuccess,
    putInventaryReCountReject,
} from "../../../actions/inventary/counts/putReCounts";

export const putInventaryReCount = (formData) => async (dispatch, getState) => {
    dispatch(putInventaryReCountLoading());
    try {
        const { data } = await putInventaryReCountRequest(formData, getState);
        dispatch(putInventaryReCountSuccess(data))
    } catch (error) {
        dispatch(putInventaryReCountReject(error))
    }
    setTimeout(() => {
        dispatch(putInventaryReCountReset())
    }, 10000);
    return Promise.resolve();
};