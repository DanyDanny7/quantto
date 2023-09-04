import {
    getInboundLoading,
    getInboundRequest,
    getInboundSuccess,
    getInboundReject,
} from "../../actions/inbound/get";

export const getInbound = (formData) => async (dispatch, getState) => {
    dispatch(getInboundLoading());
    try {
        const { data } = await getInboundRequest(formData, getState);
        dispatch(getInboundSuccess(data))
    } catch (error) {
        dispatch(getInboundReject(error))
    }
    return Promise.resolve();
};