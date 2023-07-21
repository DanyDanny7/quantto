import request, { Methods, withToken } from "../../../assets/util/request";

//* ACTIONTYPES --------------------------------------------
export const POST_COUNT_RESET = 'POST_COUNT_RESET';
export const POST_COUNT_LOADING = 'POST_COUNT_LOADING';
export const POST_COUNT_SUCCESS = 'POST_COUNT_SUCCESS';
export const POST_COUNT_REJECT = 'POST_COUNT_REJECT';

//* ACTIONS ------------------------------------------------
export const postCountReset = () => ({ type: POST_COUNT_RESET });
export const postCountLoading = () => ({ type: POST_COUNT_LOADING });
export const postCountSuccess = (payload) => ({ type: POST_COUNT_SUCCESS, payload });
export const postCountReject = (payload) => ({ type: POST_COUNT_REJECT, payload });

//* REQUEST SERVICE ---------------------------------------
export const postCountRequest = async (data, getState) => {
    const options = await withToken({
        method: Methods.POST,
        data,
    }, getState);
    return request(`/api/web/addcounters`, options);
};


