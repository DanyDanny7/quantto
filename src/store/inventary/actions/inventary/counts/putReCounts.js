import request, { Methods, withToken } from "../../../../../assets/util/request";

//* ACTIONTYPES --------------------------------------------
export const PUT_INVENTARY_RECOUNT_RESET = 'PUT_INVENTARY_RECOUNT_RESET';
export const PUT_INVENTARY_RECOUNT_LOADING = 'PUT_INVENTARY_RECOUNT_LOADING';
export const PUT_INVENTARY_RECOUNT_SUCCESS = 'PUT_INVENTARY_RECOUNT_SUCCESS';
export const PUT_INVENTARY_RECOUNT_REJECT = 'PUT_INVENTARY_RECOUNT_REJECT';

//* ACTIONS ------------------------------------------------
export const putInventaryReCountReset = () => ({ type: PUT_INVENTARY_RECOUNT_RESET });
export const putInventaryReCountLoading = () => ({ type: PUT_INVENTARY_RECOUNT_LOADING });
export const putInventaryReCountSuccess = (payload) => ({ type: PUT_INVENTARY_RECOUNT_SUCCESS, payload });
export const putInventaryReCountReject = (payload) => ({ type: PUT_INVENTARY_RECOUNT_REJECT, payload });

//* REQUEST SERVICE ---------------------------------------
export const putInventaryReCountRequest = async (data, getState) => {
    const options = await withToken({
        method: Methods.PUT,
        data,
    }, getState);
    return request(`/api/web/markcountlinetorecount`, options);
};


