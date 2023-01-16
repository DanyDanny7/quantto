import request, { Methods, withToken } from "../../../../../assets/util/request";

//* ACTIONTYPES --------------------------------------------
export const PUT_INVENTARY_START_RESET = 'PUT_INVENTARY_START_RESET';
export const PUT_INVENTARY_START_LOADING = 'PUT_INVENTARY_START_LOADING';
export const PUT_INVENTARY_START_SUCCESS = 'PUT_INVENTARY_START_SUCCESS';
export const PUT_INVENTARY_START_REJECT = 'PUT_INVENTARY_START_REJECT';

//* ACTIONS ------------------------------------------------
export const putInventaryStartReset = () => ({ type: PUT_INVENTARY_START_RESET });
export const putInventaryStartLoading = () => ({ type: PUT_INVENTARY_START_LOADING });
export const putInventaryStartSuccess = (payload) => ({ type: PUT_INVENTARY_START_SUCCESS, payload });
export const putInventaryStartReject = (payload) => ({ type: PUT_INVENTARY_START_REJECT, payload });

//* REQUEST SERVICE ---------------------------------------
export const putInventaryStartRequest = async (data, getState) => {
    const options = await withToken({
        method: Methods.PUT,
        data,
    }, getState);
    return request(`/api/web/updateinventorystart`, options);
};


