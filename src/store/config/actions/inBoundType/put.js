import request, { Methods, withToken } from "../../../../assets/util/request";

//* ACTIONTYPES --------------------------------------------
export const PUT_IN_BOUND_TYPE_RESET = 'PUT_IN_BOUND_TYPE_RESET';
export const PUT_IN_BOUND_TYPE_LOADING = 'PUT_IN_BOUND_TYPE_LOADING';
export const PUT_IN_BOUND_TYPE_SUCCESS = 'PUT_IN_BOUND_TYPE_SUCCESS';
export const PUT_IN_BOUND_TYPE_REJECT = 'PUT_IN_BOUND_TYPE_REJECT';

//* ACTIONS ------------------------------------------------
export const putInBoundTypeReset = () => ({ type: PUT_IN_BOUND_TYPE_RESET });
export const putInBoundTypeLoading = () => ({ type: PUT_IN_BOUND_TYPE_LOADING });
export const putInBoundTypeSuccess = (payload) => ({ type: PUT_IN_BOUND_TYPE_SUCCESS, payload });
export const putInBoundTypeReject = (payload) => ({ type: PUT_IN_BOUND_TYPE_REJECT, payload });

//* REQUEST SERVICE ---------------------------------------
export const putInBoundTypeRequest = async (data, getState) => {
    const options = await withToken({
        method: Methods.PUT,
        data,
    }, getState);
    return request(`/api/web/updateinboundtypes`, options);
};

