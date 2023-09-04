import {
    deleteTransferDetailReset,
    deleteTransferDetailLoading,
    deleteTransferDetailRequest,
    deleteTransferDetailSuccess,
    deleteTransferDetailReject,
} from "../../actions/detail/delete";

export const deleteTransferDetail = (formData) => async (dispatch, getState) => {
    dispatch(deleteTransferDetailLoading());
    try {
        const { data } = await deleteTransferDetailRequest(formData, getState);
        dispatch(deleteTransferDetailSuccess(data))
    } catch (error) {
        dispatch(deleteTransferDetailReject(error))
    }
    setTimeout(() => {
        dispatch(deleteTransferDetailReset())
    }, 3000);
    return Promise.resolve();
};

