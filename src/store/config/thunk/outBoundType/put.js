import {
    putOutBoundTypeReset,
    putOutBoundTypeLoading,
    putOutBoundTypeRequest,
    putOutBoundTypeSuccess,
    putOutBoundTypeReject,
} from "../../actions/outBoundType/put";

export const putOutBoundType = (formData) => async (dispatch, getState) => {
    dispatch(putOutBoundTypeLoading());
    try {
        const { data } = await putOutBoundTypeRequest(formData, getState);
        dispatch(putOutBoundTypeSuccess(data))
    } catch (error) {
        dispatch(putOutBoundTypeReject(error))
    }
    setTimeout(() => {
        dispatch(putOutBoundTypeReset())
    }, 3000);
    return Promise.resolve();
};

