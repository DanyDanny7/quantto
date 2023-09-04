import request, { Methods, withToken } from "../../../../assets/util/request";

//* ACTIONTYPES --------------------------------------------
export const PUT_TRANSFER_DETAIL_RESET = 'PUT_TRANSFER_DETAIL_RESET';
export const PUT_TRANSFER_DETAIL_LOADING = 'PUT_TRANSFER_DETAIL_LOADING';
export const PUT_TRANSFER_DETAIL_SUCCESS = 'PUT_TRANSFER_DETAIL_SUCCESS';
export const PUT_TRANSFER_DETAIL_REJECT = 'PUT_TRANSFER_DETAIL_REJECT';

//* ACTIONS ------------------------------------------------
export const putTransferDetailReset = () => ({ type: PUT_TRANSFER_DETAIL_RESET });
export const putTransferDetailLoading = () => ({ type: PUT_TRANSFER_DETAIL_LOADING });
export const putTransferDetailSuccess = (payload) => ({ type: PUT_TRANSFER_DETAIL_SUCCESS, payload });
export const putTransferDetailReject = (payload) => ({ type: PUT_TRANSFER_DETAIL_REJECT, payload });

//* REQUEST SERVICE ---------------------------------------
export const putTransferDetailRequest = async (data, getState) => {
    const options = await withToken({
        method: Methods.PUT,
        data,
    }, getState);
    return request(`/api/web/updatetransferdetail`, options);
};
