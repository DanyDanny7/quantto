import {
    postInboundReset,
    postInboundLoading,
    postInboundRequest,
    postInboundSuccess,
    postInboundReject,
} from "../../actions/inbound/post";

export const postInbound = (formData) => async (dispatch, getState) => {
    dispatch(postInboundLoading());
    try {
        const { data } = await postInboundRequest(formData, getState);
        dispatch(postInboundSuccess(data))
    } catch (error) {
        dispatch(postInboundReject(error))
    }
    setTimeout(() => {
        dispatch(postInboundReset())
    }, 3000);
    return Promise.resolve();
};

