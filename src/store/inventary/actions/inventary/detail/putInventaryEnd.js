import request, { Methods, withToken } from "../../../../../assets/util/request";

//* ACTIONTYPES --------------------------------------------
export const PUT_INVENTARY_END_RESET = 'PUT_INVENTARY_END_RESET';
export const PUT_INVENTARY_END_LOADING = 'PUT_INVENTARY_END_LOADING';
export const PUT_INVENTARY_END_SUCCESS = 'PUT_INVENTARY_END_SUCCESS';
export const PUT_INVENTARY_END_REJECT = 'PUT_INVENTARY_END_REJECT';

//* ACTIONS ------------------------------------------------
export const putInventaryEndReset = () => ({ type: PUT_INVENTARY_END_RESET });
export const putInventaryEndLoading = () => ({ type: PUT_INVENTARY_END_LOADING });
export const putInventaryEndSuccess = (payload) => ({ type: PUT_INVENTARY_END_SUCCESS, payload });
export const putInventaryEndReject = (payload) => ({ type: PUT_INVENTARY_END_REJECT, payload });

//* REQUEST SERVICE ---------------------------------------
export const putInventaryEndRequest = async (data, getState) => {
    const options = await withToken({
        method: Methods.PUT,
        data,
    }, getState);
    return request(`/api/web/updateinventoryend`, options);
};


