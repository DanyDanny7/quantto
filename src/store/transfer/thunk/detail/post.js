import {
    postTransferDetailReset,
    postTransferDetailLoading,
    postTransferDetailRequest,
    postTransferDetailSuccess,
    postTransferDetailReject,
} from "../../actions/detail/post";

export const postTransferDetail = (formData) => async (dispatch, getState) => {
    dispatch(postTransferDetailLoading());
    try {
        const { data } = await postTransferDetailRequest(formData, getState);
        dispatch(postTransferDetailSuccess(data))
    } catch (error) {
        dispatch(postTransferDetailReject(error))
    }
    setTimeout(() => {
        dispatch(postTransferDetailReset())
    }, 3000);
    return Promise.resolve();
};

