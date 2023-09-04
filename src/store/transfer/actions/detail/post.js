import request, { Methods, withToken } from "../../../../assets/util/request";

//* ACTIONTYPES --------------------------------------------
export const POST_TRANSFER_DETAIL_RESET = 'POST_TRANSFER_DETAIL_RESET';
export const POST_TRANSFER_DETAIL_LOADING = 'POST_TRANSFER_DETAIL_LOADING';
export const POST_TRANSFER_DETAIL_SUCCESS = 'POST_TRANSFER_DETAIL_SUCCESS';
export const POST_TRANSFER_DETAIL_REJECT = 'POST_TRANSFER_DETAIL_REJECT';

//* ACTIONS ------------------------------------------------
export const postTransferDetailReset = () => ({ type: POST_TRANSFER_DETAIL_RESET });
export const postTransferDetailLoading = () => ({ type: POST_TRANSFER_DETAIL_LOADING });
export const postTransferDetailSuccess = (payload) => ({ type: POST_TRANSFER_DETAIL_SUCCESS, payload });
export const postTransferDetailReject = (payload) => ({ type: POST_TRANSFER_DETAIL_REJECT, payload });

//* REQUEST SERVICE ---------------------------------------
export const postTransferDetailRequest = async (data, getState) => {
    const options = await withToken({
        method: Methods.POST,
        data,
    }, getState);
    return request(`/api/web/addtransferdetail`, options);
};
