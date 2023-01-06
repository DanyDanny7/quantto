import request, { Methods, withToken } from "../../../../../assets/util/request";

//* ACTIONTYPES --------------------------------------------
export const POST_INVENTARY_CONTER_RESET = 'POST_INVENTARY_CONTER_RESET';
export const POST_INVENTARY_CONTER_LOADING = 'POST_INVENTARY_CONTER_LOADING';
export const POST_INVENTARY_CONTER_SUCCESS = 'POST_INVENTARY_CONTER_SUCCESS';
export const POST_INVENTARY_CONTER_REJECT = 'POST_INVENTARY_CONTER_REJECT';

//* ACTIONS ------------------------------------------------
export const postInventaryCounterReset = () => ({ type: POST_INVENTARY_CONTER_RESET });
export const postInventaryCounterLoading = () => ({ type: POST_INVENTARY_CONTER_LOADING });
export const postInventaryCounterSuccess = (payload) => ({ type: POST_INVENTARY_CONTER_SUCCESS, payload });
export const postInventaryCounterReject = (payload) => ({ type: POST_INVENTARY_CONTER_REJECT, payload });

//* REQUEST SERVICE ---------------------------------------
export const postInventaryCounterRequest = async (data, getState) => {
    const options = await withToken({
        method: Methods.POST,
        data,
    }, getState);
    return request(`/api/web/addinventorycounters`, options);
};


