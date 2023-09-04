import {
    getTransferLoading,
    getTransferRequest,
    getTransferSuccess,
    getTransferReject,
} from "../../actions/transfer/get";

export const getTransfer = (formData) => async (dispatch, getState) => {
    dispatch(getTransferLoading());
    try {
        const { data } = await getTransferRequest(formData, getState);
        dispatch(getTransferSuccess(data))
    } catch (error) {
        dispatch(getTransferReject(error))
    }
    return Promise.resolve();
};