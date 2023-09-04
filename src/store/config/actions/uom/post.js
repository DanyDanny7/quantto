import request, { Methods, withToken } from "../../../../assets/util/request";

//* ACTIONTYPES --------------------------------------------
export const POST_UOM_RESET = 'POST_UOM_RESET';
export const POST_UOM_LOADING = 'POST_UOM_LOADING';
export const POST_UOM_SUCCESS = 'POST_UOM_SUCCESS';
export const POST_UOM_REJECT = 'POST_UOM_REJECT';

//* ACTIONS ------------------------------------------------
export const postUomReset = () => ({ type: POST_UOM_RESET });
export const postUomLoading = () => ({ type: POST_UOM_LOADING });
export const postUomSuccess = (payload) => ({ type: POST_UOM_SUCCESS, payload });
export const postUomReject = (payload) => ({ type: POST_UOM_REJECT, payload });

//* REQUEST SERVICE ---------------------------------------
export const postUomRequest = async (data, getState) => {
    const options = await withToken({
        method: Methods.POST,
        data,
    }, getState);
    return request(`/api/web/adduom`, options);
};
