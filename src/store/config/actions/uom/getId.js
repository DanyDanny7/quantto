import request, { Methods, withToken } from "../../../../assets/util/request";

//* ACTIONTYPES --------------------------------------------
export const GET_UOM_ID_LOADING = 'GET_UOM_ID_LOADING';
export const GET_UOM_ID_SUCCESS = 'GET_UOM_ID_SUCCESS';
export const GET_UOM_ID_REJECT = 'GET_UOM_ID_REJECT';

//* ACTIONS ------------------------------------------------
export const getUomIdLoading = () => ({ type: GET_UOM_ID_LOADING });
export const getUomIdSuccess = (payload) => ({ type: GET_UOM_ID_SUCCESS, payload });
export const getUomIdReject = (payload) => ({ type: GET_UOM_ID_REJECT, payload });

//* REQUEST SERVICE ---------------------------------------
export const getUomIdRequest = async (params = {}, getState) => {
    const options = await withToken({
        method: Methods.GET,
        params,
    }, getState);
    return request(`/api/web/getuombyid`, options);
};
