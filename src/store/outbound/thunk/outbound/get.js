import {
    getOutboundLoading,
    getOutboundRequest,
    getOutboundSuccess,
    getOutboundReject,
} from "../../actions/outbound/get";

export const getOutbound = (formData) => async (dispatch, getState) => {
    dispatch(getOutboundLoading());
    try {
        const { data } = await getOutboundRequest(formData, getState);
        dispatch(getOutboundSuccess(data))
    } catch (error) {
        dispatch(getOutboundReject(error))
    }
    return Promise.resolve();
};