import {
    getOutboundIdLoading,
    getOutboundIdRequest,
    getOutboundIdSuccess,
    getOutboundIdReject,
} from "../../actions/outbound/getId";

export const getOutboundId = (formData) => async (dispatch, getState) => {
    dispatch(getOutboundIdLoading());
    try {
        const { data } = await getOutboundIdRequest(formData, getState);
        dispatch(getOutboundIdSuccess(data))
    } catch (error) {
        dispatch(getOutboundIdReject(error))
    }
    return Promise.resolve();
};