import {
    getInBoundTypeIdLoading,
    getInBoundTypeIdRequest,
    getInBoundTypeIdSuccess,
    getInBoundTypeIdReject,
} from "../../actions/inBoundType/getId";

export const getInBoundTypeId = (formData) => async (dispatch, getState) => {
    dispatch(getInBoundTypeIdLoading());
    try {
        const { data } = await getInBoundTypeIdRequest(formData, getState);
        dispatch(getInBoundTypeIdSuccess(data))
    } catch (error) {
        dispatch(getInBoundTypeIdReject(error))
    }
    return Promise.resolve();
};