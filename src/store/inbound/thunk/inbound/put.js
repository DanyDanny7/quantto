import {
    putInboundReset,
    putInboundLoading,
    putInboundRequest,
    putInboundSuccess,
    putInboundReject,
} from "../../actions/inbound/put";

export const putInbound = (formData) => async (dispatch, getState) => {
    dispatch(putInboundLoading());
    try {
        const { data } = await putInboundRequest(formData, getState);
        dispatch(putInboundSuccess(data))
    } catch (error) {
        dispatch(putInboundReject(error))
    }
    setTimeout(() => {
        dispatch(putInboundReset())
    }, 3000);
    return Promise.resolve();
};

