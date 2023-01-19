import request, { Methods, withToken, RequestType } from "../../../../assets/util/request";

//* ACTIONTYPES --------------------------------------------
export const POST_INVENTARY_RESET = 'POST_INVENTARY_RESET';
export const POST_INVENTARY_LOADING = 'POST_INVENTARY_LOADING';
export const POST_INVENTARY_SUCCESS = 'POST_INVENTARY_SUCCESS';
export const POST_INVENTARY_REJECT = 'POST_INVENTARY_REJECT';

//* ACTIONS ------------------------------------------------
export const postInventaryReset = () => ({ type: POST_INVENTARY_RESET });
export const postInventaryLoading = () => ({ type: POST_INVENTARY_LOADING });
export const postInventarySuccess = (payload) => ({ type: POST_INVENTARY_SUCCESS, payload });
export const postInventaryReject = (payload) => ({ type: POST_INVENTARY_REJECT, payload });

//* REQUEST SERVICE ---------------------------------------
export const postInventaryRequest = async (data, getState) => {
    const options = await withToken({
        method: Methods.POST,
        headers: RequestType.Multipart,
        data,
    }, getState);
    return request(`/api/web/addinventory`, options);
};


