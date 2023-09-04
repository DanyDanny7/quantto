import {
    deleteOutboundReset,
    deleteOutboundLoading,
    deleteOutboundRequest,
    deleteOutboundSuccess,
    deleteOutboundReject,
} from "../../actions/outbound/delete";

export const deleteOutbound = (formData) => async (dispatch, getState) => {
    dispatch(deleteOutboundLoading());
    try {
        const { data } = await deleteOutboundRequest(formData, getState);
        dispatch(deleteOutboundSuccess(data))
    } catch (error) {
        dispatch(deleteOutboundReject(error))
    }
    setTimeout(() => {
        dispatch(deleteOutboundReset())
    }, 3000);
    return Promise.resolve();
};

