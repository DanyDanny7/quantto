import {
    getOutBoundTypeLoading,
    getOutBoundTypeRequest,
    getOutBoundTypeSuccess,
    getOutBoundTypeReject,
} from "../../actions/outBoundType/get";

export const getOutBoundType = (formData) => async (dispatch, getState) => {
    dispatch(getOutBoundTypeLoading());
    try {
        const { data } = await getOutBoundTypeRequest(formData, getState);
        dispatch(getOutBoundTypeSuccess(data))
    } catch (error) {
        dispatch(getOutBoundTypeReject(error))
    }
    return Promise.resolve();
};