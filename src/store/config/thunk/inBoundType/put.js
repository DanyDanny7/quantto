import {
    putInBoundTypeReset,
    putInBoundTypeLoading,
    putInBoundTypeRequest,
    putInBoundTypeSuccess,
    putInBoundTypeReject,
} from "../../actions/inBoundType/put";

export const putInBoundType = (formData) => async (dispatch, getState) => {
    dispatch(putInBoundTypeLoading());
    try {
        const { data } = await putInBoundTypeRequest(formData, getState);
        dispatch(putInBoundTypeSuccess(data))
    } catch (error) {
        dispatch(putInBoundTypeReject(error))
    }
    setTimeout(() => {
        dispatch(putInBoundTypeReset())
    }, 3000);
    return Promise.resolve();
};

