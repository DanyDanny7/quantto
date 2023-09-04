import {
    postOutBoundTypeReset,
    postOutBoundTypeLoading,
    postOutBoundTypeRequest,
    postOutBoundTypeSuccess,
    postOutBoundTypeReject,
} from "../../actions/outBoundType/post";

export const postOutBoundType = (formData) => async (dispatch, getState) => {
    dispatch(postOutBoundTypeLoading());
    try {
        const { data } = await postOutBoundTypeRequest(formData, getState);
        dispatch(postOutBoundTypeSuccess(data))
    } catch (error) {
        dispatch(postOutBoundTypeReject(error))
    }
    setTimeout(() => {
        dispatch(postOutBoundTypeReset())
    }, 3000);
    return Promise.resolve();
};

