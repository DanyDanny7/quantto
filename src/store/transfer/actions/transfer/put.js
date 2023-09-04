import request, { Methods, withToken } from "../../../../assets/util/request";

//* ACTIONTYPES --------------------------------------------
export const PUT_TRANSFER_RESET = 'PUT_TRANSFER_RESET';
export const PUT_TRANSFER_LOADING = 'PUT_TRANSFER_LOADING';
export const PUT_TRANSFER_SUCCESS = 'PUT_TRANSFER_SUCCESS';
export const PUT_TRANSFER_REJECT = 'PUT_TRANSFER_REJECT';

//* ACTIONS ------------------------------------------------
export const putTransferReset = () => ({ type: PUT_TRANSFER_RESET });
export const putTransferLoading = () => ({ type: PUT_TRANSFER_LOADING });
export const putTransferSuccess = (payload) => ({ type: PUT_TRANSFER_SUCCESS, payload });
export const putTransferReject = (payload) => ({ type: PUT_TRANSFER_REJECT, payload });

//* REQUEST SERVICE ---------------------------------------
export const putTransferRequest = async (data, getState) => {
    const options = await withToken({
        method: Methods.PUT,
        data,
    }, getState);
    return request(`/api/web/updatetransfer`, options);
};