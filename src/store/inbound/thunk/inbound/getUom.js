import {
    getInboundUomLoading,
    getInboundUomRequest,
    getInboundUomSuccess,
    getInboundUomReject,
} from "../../actions/inbound/getUom";

export const getInboundUom = (formData) => async (dispatch, getState) => {
    dispatch(getInboundUomLoading());
    try {
        const { data } = await getInboundUomRequest(formData, getState);
        dispatch(getInboundUomSuccess(data))
    } catch (error) {
        dispatch(getInboundUomReject(error))
    }
    return Promise.resolve();
};