import {
    postOutboundReset,
    postOutboundLoading,
    postOutboundRequest,
    postOutboundSuccess,
    postOutboundReject,
} from "../../actions/outbound/post";

export const postOutbound = (formData) => async (dispatch, getState) => {
    dispatch(postOutboundLoading());
    try {
        const { data } = await postOutboundRequest(formData, getState);
        dispatch(postOutboundSuccess(data))
    } catch (error) {
        dispatch(postOutboundReject(error))
    }
    setTimeout(() => {
        dispatch(postOutboundReset())
    }, 3000);
    return Promise.resolve();
};

