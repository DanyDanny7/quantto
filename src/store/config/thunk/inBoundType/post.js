import {
    postInBoundTypeReset,
    postInBoundTypeLoading,
    postInBoundTypeRequest,
    postInBoundTypeSuccess,
    postInBoundTypeReject,
} from "../../actions/inBoundType/post";

export const postInBoundType = (formData) => async (dispatch, getState) => {
    dispatch(postInBoundTypeLoading());
    try {
        const { data } = await postInBoundTypeRequest(formData, getState);
        dispatch(postInBoundTypeSuccess(data))
    } catch (error) {
        dispatch(postInBoundTypeReject(error))
    }
    setTimeout(() => {
        dispatch(postInBoundTypeReset())
    }, 3000);
    return Promise.resolve();
};

