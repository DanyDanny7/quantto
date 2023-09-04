import {
    putTransferReset,
    putTransferLoading,
    putTransferRequest,
    putTransferSuccess,
    putTransferReject,
} from "../../actions/transfer/put";

export const putTransfer = (formData) => async (dispatch, getState) => {
    dispatch(putTransferLoading());
    try {
        const { data } = await putTransferRequest(formData, getState);
        dispatch(putTransferSuccess(data))
    } catch (error) {
        dispatch(putTransferReject(error))
    }
    setTimeout(() => {
        dispatch(putTransferReset())
    }, 3000);
    return Promise.resolve();
};

