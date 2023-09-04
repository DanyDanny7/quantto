import {
    deleteTransferReset,
    deleteTransferLoading,
    deleteTransferRequest,
    deleteTransferSuccess,
    deleteTransferReject,
} from "../../actions/transfer/delete";

export const deleteTransfer = (formData) => async (dispatch, getState) => {
    dispatch(deleteTransferLoading());
    try {
        const { data } = await deleteTransferRequest(formData, getState);
        dispatch(deleteTransferSuccess(data))
    } catch (error) {
        dispatch(deleteTransferReject(error))
    }
    setTimeout(() => {
        dispatch(deleteTransferReset())
    }, 3000);
    return Promise.resolve();
};

