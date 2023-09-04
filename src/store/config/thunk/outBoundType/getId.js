import {
    getOutBoundTypeIdLoading,
    getOutBoundTypeIdRequest,
    getOutBoundTypeIdSuccess,
    getOutBoundTypeIdReject,
} from "../../actions/outBoundType/getId";

export const getOutBoundTypeId = (formData) => async (dispatch, getState) => {
    dispatch(getOutBoundTypeIdLoading());
    try {
        const { data } = await getOutBoundTypeIdRequest(formData, getState);
        dispatch(getOutBoundTypeIdSuccess(data))
    } catch (error) {
        dispatch(getOutBoundTypeIdReject(error))
    }
    return Promise.resolve();
};