import request, { Methods, withToken, RequestType } from "../../../../assets/util/request";

//* ACTIONTYPES --------------------------------------------
export const PUT_INVENTARY_RESET = 'PUT_INVENTARY_RESET';
export const PUT_INVENTARY_LOADING = 'PUT_INVENTARY_LOADING';
export const PUT_INVENTARY_SUCCESS = 'PUT_INVENTARY_SUCCESS';
export const PUT_INVENTARY_REJECT = 'PUT_INVENTARY_REJECT';

//* ACTIONS ------------------------------------------------
export const putInventaryReset = () => ({ type: PUT_INVENTARY_RESET });
export const putInventaryLoading = () => ({ type: PUT_INVENTARY_LOADING });
export const putInventarySuccess = (payload) => ({ type: PUT_INVENTARY_SUCCESS, payload });
export const putInventaryReject = (payload) => ({ type: PUT_INVENTARY_REJECT, payload });

//* REQUEST SERVICE ---------------------------------------
export const putInventaryRequest = async (data, getState) => {
    const options = await withToken({
        method: Methods.PUT,
        headers: RequestType.Multipart,
        data,
    }, getState);
    return request(`/api/web/updateinventorytemplate`, options);
};


