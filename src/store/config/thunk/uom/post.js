import {
    postUomReset,
    postUomLoading,
    postUomRequest,
    postUomSuccess,
    postUomReject,
} from "../../actions/uom/post";

export const postUom = (formData) => async (dispatch, getState) => {
    dispatch(postUomLoading());
    try {
        const { data } = await postUomRequest(formData, getState);
        dispatch(postUomSuccess(data))
    } catch (error) {
        dispatch(postUomReject(error))
    }
    setTimeout(() => {
        dispatch(postUomReset())
    }, 3000);
    return Promise.resolve();
};

