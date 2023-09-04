import {
    putOutboundReset,
    putOutboundLoading,
    putOutboundRequest,
    putOutboundSuccess,
    putOutboundReject,
} from "../../actions/outbound/put";

export const putOutbound = (formData) => async (dispatch, getState) => {
    dispatch(putOutboundLoading());
    try {
        const { data } = await putOutboundRequest(formData, getState);
        dispatch(putOutboundSuccess(data))
    } catch (error) {
        dispatch(putOutboundReject(error))
    }
    setTimeout(() => {
        dispatch(putOutboundReset())
    }, 3000);
    return Promise.resolve();
};

