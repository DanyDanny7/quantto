import request, { Methods, withToken } from "../../../assets/util/request";

//* ACTIONTYPES --------------------------------------------
export const PUT_COUNT_RESET = 'PUT_COUNT_RESET';
export const PUT_COUNT_LOADING = 'PUT_COUNT_LOADING';
export const PUT_COUNT_SUCCESS = 'PUT_COUNT_SUCCESS';
export const PUT_COUNT_REJECT = 'PUT_COUNT_REJECT';

//* ACTIONS ------------------------------------------------
export const putCountReset = () => ({ type: PUT_COUNT_RESET });
export const putCountLoading = () => ({ type: PUT_COUNT_LOADING });
export const putCountSuccess = (payload) => ({ type: PUT_COUNT_SUCCESS, payload });
export const putCountReject = (payload) => ({ type: PUT_COUNT_REJECT, payload });

//* REQUEST SERVICE ---------------------------------------
export const putCountRequest = async (data, getState) => {
    const options = await withToken({
        method: Methods.PUT,
        data,
    }, getState);
    return request(`/api/web/updatecounters`, options);
};


