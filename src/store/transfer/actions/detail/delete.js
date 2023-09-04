import request, { Methods, withToken } from "../../../../assets/util/request";

//* ACTIONTYPES --------------------------------------------
export const DELETE_TRANSFER_DETAIL_RESET = 'DELETE_TRANSFER_DETAIL_RESET';
export const DELETE_TRANSFER_DETAIL_LOADING = 'DELETE_TRANSFER_DETAIL_LOADING';
export const DELETE_TRANSFER_DETAIL_SUCCESS = 'DELETE_TRANSFER_DETAIL_SUCCESS';
export const DELETE_TRANSFER_DETAIL_REJECT = 'DELETE_TRANSFER_DETAIL_REJECT';

//* ACTIONS ------------------------------------------------
export const deleteTransferDetailReset = () => ({ type: DELETE_TRANSFER_DETAIL_RESET });
export const deleteTransferDetailLoading = () => ({ type: DELETE_TRANSFER_DETAIL_LOADING });
export const deleteTransferDetailSuccess = (payload) => ({ type: DELETE_TRANSFER_DETAIL_SUCCESS, payload });
export const deleteTransferDetailReject = (payload) => ({ type: DELETE_TRANSFER_DETAIL_REJECT, payload });

//* REQUEST SERVICE ---------------------------------------
export const deleteTransferDetailRequest = async (data, getState) => {
    const options = await withToken({
        method: Methods.DELETE,
        data,
    }, getState);
    return request(`/api/web/deletetransferdetail`, options);
};
