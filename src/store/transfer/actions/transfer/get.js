import request, { Methods, withToken } from "../../../../assets/util/request";

//* ACTIONTYPES --------------------------------------------
export const GET_TRANSFER_LOADING = 'GET_TRANSFER_LOADING';
export const GET_TRANSFER_SUCCESS = 'GET_TRANSFER_SUCCESS';
export const GET_TRANSFER_REJECT = 'GET_TRANSFER_REJECT';

//* ACTIONS ------------------------------------------------
export const getTransferLoading = () => ({ type: GET_TRANSFER_LOADING });
export const getTransferSuccess = (payload) => ({ type: GET_TRANSFER_SUCCESS, payload });
export const getTransferReject = (payload) => ({ type: GET_TRANSFER_REJECT, payload });

//* REQUEST SERVICE ---------------------------------------
export const getTransferRequest = async (params = {}, getState) => {
    const options = await withToken({
        method: Methods.GET,
        params,
    }, getState);
    return request(`/api/web/gettransfer`, options);
};
