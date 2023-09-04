import request, { Methods, withToken } from "../../../../assets/util/request";

//* ACTIONTYPES --------------------------------------------
export const DELETE_TRANSFER_RESET = 'DELETE_TRANSFER_RESET';
export const DELETE_TRANSFER_LOADING = 'DELETE_TRANSFER_LOADING';
export const DELETE_TRANSFER_SUCCESS = 'DELETE_TRANSFER_SUCCESS';
export const DELETE_TRANSFER_REJECT = 'DELETE_TRANSFER_REJECT';

//* ACTIONS ------------------------------------------------
export const deleteTransferReset = () => ({ type: DELETE_TRANSFER_RESET });
export const deleteTransferLoading = () => ({ type: DELETE_TRANSFER_LOADING });
export const deleteTransferSuccess = (payload) => ({ type: DELETE_TRANSFER_SUCCESS, payload });
export const deleteTransferReject = (payload) => ({ type: DELETE_TRANSFER_REJECT, payload });

//* REQUEST SERVICE ---------------------------------------
export const deleteTransferRequest = async (data, getState) => {
    const options = await withToken({
        method: Methods.DELETE,
        data,
    }, getState);
    return request(`/api/web/deletetransfer`, options);
};