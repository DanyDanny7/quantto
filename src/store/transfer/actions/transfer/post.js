import request, { Methods, withToken } from "../../../../assets/util/request";

//* ACTIONTYPES --------------------------------------------
export const POST_TRANSFER_RESET = 'POST_TRANSFER_RESET';
export const POST_TRANSFER_LOADING = 'POST_TRANSFER_LOADING';
export const POST_TRANSFER_SUCCESS = 'POST_TRANSFER_SUCCESS';
export const POST_TRANSFER_REJECT = 'POST_TRANSFER_REJECT';

//* ACTIONS ------------------------------------------------
export const postTransferReset = () => ({ type: POST_TRANSFER_RESET });
export const postTransferLoading = () => ({ type: POST_TRANSFER_LOADING });
export const postTransferSuccess = (payload) => ({ type: POST_TRANSFER_SUCCESS, payload });
export const postTransferReject = (payload) => ({ type: POST_TRANSFER_REJECT, payload });

//* REQUEST SERVICE ---------------------------------------
export const postTransferRequest = async (data, getState) => {
    const options = await withToken({
        method: Methods.POST,
        data,
    }, getState);
    return request(`/api/web/addtransfer`, options);
};