import {
    postInventaryReset,
    postInventaryLoading,
    postInventaryRequest,
    postInventarySuccess,
    postInventaryReject,
} from "../../actions/inventary/postInventary";

export const postInventary = (formData) => async (dispatch, getState) => {
    dispatch(postInventaryLoading());
    try {
        const { data } = await postInventaryRequest(formData, getState);
        dispatch(postInventarySuccess(data))
    } catch (error) {
        dispatch(postInventaryReject(error))
    }
    setTimeout(() => {
        dispatch(postInventaryReset())
    }, 10000);
    return Promise.resolve();
};