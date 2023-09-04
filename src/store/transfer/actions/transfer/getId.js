import request, { Methods, withToken } from "../../../../assets/util/request";

//* ACTIONTYPES --------------------------------------------
export const GET_TRANSFER_ID_LOADING = 'GET_TRANSFER_ID_LOADING';
export const GET_TRANSFER_ID_SUCCESS = 'GET_TRANSFER_ID_SUCCESS';
export const GET_TRANSFER_ID_REJECT = 'GET_TRANSFER_ID_REJECT';

//* ACTIONS ------------------------------------------------
export const getTransferIdLoading = () => ({ type: GET_TRANSFER_ID_LOADING });
export const getTransferIdSuccess = (payload) => ({ type: GET_TRANSFER_ID_SUCCESS, payload });
export const getTransferIdReject = (payload) => ({ type: GET_TRANSFER_ID_REJECT, payload });

//* REQUEST SERVICE ---------------------------------------
export const getTransferIdRequest = async (params = {}, getState) => {
    const options = await withToken({
        method: Methods.GET,
        params,
    }, getState);
    return request(`/api/web/gettransferbyid`, options);
};