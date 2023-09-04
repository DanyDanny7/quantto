import {
    postTransferReset,
    postTransferLoading,
    postTransferRequest,
    postTransferSuccess,
    postTransferReject,
} from "../../actions/transfer/post";

export const postTransfer = (formData) => async (dispatch, getState) => {
    dispatch(postTransferLoading());
    try {
        const { data } = await postTransferRequest(formData, getState);
        dispatch(postTransferSuccess(data))
    } catch (error) {
        dispatch(postTransferReject(error))
    }
    setTimeout(() => {
        dispatch(postTransferReset())
    }, 3000);
    return Promise.resolve();
};

