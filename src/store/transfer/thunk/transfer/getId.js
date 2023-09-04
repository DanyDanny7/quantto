import {
    getTransferIdLoading,
    getTransferIdRequest,
    getTransferIdSuccess,
    getTransferIdReject,
} from "../../actions/transfer/getId";

export const getTransferId = (formData) => async (dispatch, getState) => {
    dispatch(getTransferIdLoading());
    try {
        const { data } = await getTransferIdRequest(formData, getState);
        dispatch(getTransferIdSuccess(data))
    } catch (error) {
        dispatch(getTransferIdReject(error))
    }
    return Promise.resolve();
};