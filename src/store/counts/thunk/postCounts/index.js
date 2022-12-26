import {
    postCountReset,
    postCountLoading,
    postCountRequest,
    postCountSuccess,
    postCountReject,
} from "../../actions/postCounts";

export const postCount = (formData) => async (dispatch, getState) => {
    dispatch(postCountLoading());
    try {
        const { data } = await postCountRequest(formData, getState);
        dispatch(postCountSuccess(data))
    } catch (error) {
        dispatch(postCountReject(error))
    }
    setTimeout(() => {
        dispatch(postCountReset())
    }, 10000);
    return Promise.resolve();
};