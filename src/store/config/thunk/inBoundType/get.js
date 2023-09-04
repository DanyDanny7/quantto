import {
    getInBoundTypeLoading,
    getInBoundTypeRequest,
    getInBoundTypeSuccess,
    getInBoundTypeReject,
} from "../../actions/inBoundType/get";

export const getInBoundType = (formData) => async (dispatch, getState) => {
    dispatch(getInBoundTypeLoading());
    try {
        const { data } = await getInBoundTypeRequest(formData, getState);
        dispatch(getInBoundTypeSuccess(data))
    } catch (error) {
        dispatch(getInBoundTypeReject(error))
    }
    return Promise.resolve();
};