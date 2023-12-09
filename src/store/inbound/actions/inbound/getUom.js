import request, { Methods, withToken } from "../../../../assets/util/request";

//* ACTIONTYPES --------------------------------------------
export const GET_INBOUND_UOM_LOADING = 'GET_INBOUND_UOM_LOADING';
export const GET_INBOUND_UOM_SUCCESS = 'GET_INBOUND_UOM_SUCCESS';
export const GET_INBOUND_UOM_REJECT = 'GET_INBOUND_UOM_REJECT';

//* ACTIONS ------------------------------------------------
export const getInboundUomLoading = () => ({ type: GET_INBOUND_UOM_LOADING });
export const getInboundUomSuccess = (payload) => ({ type: GET_INBOUND_UOM_SUCCESS, payload });
export const getInboundUomReject = (payload) => ({ type: GET_INBOUND_UOM_REJECT, payload });

//* REQUEST SERVICE ---------------------------------------
export const getInboundUomRequest = async (params = {}, getState) => {
    const options = await withToken({
        method: Methods.GET,
        params,
    }, getState);
    return request(`/api/web/getitemsuombyitemid`, options);
};
