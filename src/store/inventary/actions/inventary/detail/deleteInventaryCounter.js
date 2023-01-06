import request, { Methods, withToken } from "../../../../../assets/util/request";

//* ACTIONTYPES --------------------------------------------
export const DELETE_INVENTARY_CONTER_RESET = 'DELETE_INVENTARY_CONTER_RESET';
export const DELETE_INVENTARY_CONTER_LOADING = 'DELETE_INVENTARY_CONTER_LOADING';
export const DELETE_INVENTARY_CONTER_SUCCESS = 'DELETE_INVENTARY_CONTER_SUCCESS';
export const DELETE_INVENTARY_CONTER_REJECT = 'DELETE_INVENTARY_CONTER_REJECT';

//* ACTIONS ------------------------------------------------
export const deleteInventaryCounterReset = () => ({ type: DELETE_INVENTARY_CONTER_RESET });
export const deleteInventaryCounterLoading = () => ({ type: DELETE_INVENTARY_CONTER_LOADING });
export const deleteInventaryCounterSuccess = (payload) => ({ type: DELETE_INVENTARY_CONTER_SUCCESS, payload });
export const deleteInventaryCounterReject = (payload) => ({ type: DELETE_INVENTARY_CONTER_REJECT, payload });

//* REQUEST SERVICE ---------------------------------------
export const deleteInventaryCounterRequest = async (data, getState) => {
    const options = await withToken({
        method: Methods.DELETE,
        data,
    }, getState);
    return request(`/api/web/deleteinventorycounters`, options);
};


