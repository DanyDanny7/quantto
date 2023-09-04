import {
    deleteInboundReset,
    deleteInboundLoading,
    deleteInboundRequest,
    deleteInboundSuccess,
    deleteInboundReject,
} from "../../actions/inbound/delete";

export const deleteInbound = (formData) => async (dispatch, getState) => {
    dispatch(deleteInboundLoading());
    try {
        const { data } = await deleteInboundRequest(formData, getState);
        dispatch(deleteInboundSuccess(data))
    } catch (error) {
        dispatch(deleteInboundReject(error))
    }
    setTimeout(() => {
        dispatch(deleteInboundReset())
    }, 3000);
    return Promise.resolve();
};

