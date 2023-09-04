import {
    putTransferDetailReset,
    putTransferDetailLoading,
    putTransferDetailRequest,
    putTransferDetailSuccess,
    putTransferDetailReject,
} from "../../actions/detail/put";

export const putTransferDetail = (formData) => async (dispatch, getState) => {
    dispatch(putTransferDetailLoading());
    try {
        const { data } = await putTransferDetailRequest(formData, getState);
        dispatch(putTransferDetailSuccess(data))
    } catch (error) {
        dispatch(putTransferDetailReject(error))
    }
    setTimeout(() => {
        dispatch(putTransferDetailReset())
    }, 3000);
    return Promise.resolve();
};

