import request, { Methods, withToken } from "../../../../assets/util/request";

//* ACTIONTYPES --------------------------------------------
export const PUT_CLOSE_TRANSFER_RESET = 'PUT_CLOSE_TRANSFER_RESET';
export const PUT_CLOSE_TRANSFER_LOADING = 'PUT_CLOSE_TRANSFER_LOADING';
export const PUT_CLOSE_TRANSFER_SUCCESS = 'PUT_CLOSE_TRANSFER_SUCCESS';
export const PUT_CLOSE_TRANSFER_REJECT = 'PUT_CLOSE_TRANSFER_REJECT';

//* ACTIONS ------------------------------------------------
export const putCloseTransferReset = () => ({ type: PUT_CLOSE_TRANSFER_RESET });
export const putCloseTransferLoading = () => ({ type: PUT_CLOSE_TRANSFER_LOADING });
export const putCloseTransferSuccess = (payload) => ({ type: PUT_CLOSE_TRANSFER_SUCCESS, payload });
export const putCloseTransferReject = (payload) => ({ type: PUT_CLOSE_TRANSFER_REJECT, payload });

//* REQUEST SERVICE ---------------------------------------
export const putCloseTransferRequest = async (data, getState) => {
    const options = await withToken({
        method: Methods.PUT,
        data,
    }, getState);
    return request(`/api/web/transferclose`, options);
};