import request, { Methods, withToken } from "../../../../assets/util/request";

//* ACTIONTYPES --------------------------------------------
export const POST_INVENTARY_FREE_LOADING = 'POST_INVENTARY_FREE_LOADING';
export const POST_INVENTARY_FREE_SUCCESS = 'POST_INVENTARY_FREE_SUCCESS';
export const POST_INVENTARY_FREE_REJECT = 'POST_INVENTARY_FREE_REJECT';

//* ACTIONS ------------------------------------------------
export const postInventaryFreeLoading = () => ({ type: POST_INVENTARY_FREE_LOADING });
export const postInventaryFreeSuccess = (payload) => ({ type: POST_INVENTARY_FREE_SUCCESS, payload });
export const postInventaryFreeReject = (payload) => ({ type: POST_INVENTARY_FREE_REJECT, payload });

//* REQUEST SERVICE ---------------------------------------
export const postInventaryFreeRequest = async (params = {}, getState) => {
    const options = await withToken({
        method: Methods.POST,
        params,
    }, getState);
    return request(`/api/web/addiventorypaymentforfree`, options);
};


