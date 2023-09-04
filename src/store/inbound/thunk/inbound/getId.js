import {
    getInboundIdLoading,
    getInboundIdRequest,
    getInboundIdSuccess,
    getInboundIdReject,
} from "../../actions/inbound/getId";

export const getInboundId = (formData) => async (dispatch, getState) => {
    dispatch(getInboundIdLoading());
    try {
        const { data } = await getInboundIdRequest(formData, getState);
        dispatch(getInboundIdSuccess(data))
    } catch (error) {
        dispatch(getInboundIdReject(error))
    }
    return Promise.resolve();
};