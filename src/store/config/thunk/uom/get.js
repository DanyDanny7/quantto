import {
    getUomLoading,
    getUomRequest,
    getUomSuccess,
    getUomReject,
} from "../../actions/uom/get";

export const getUom = (formData) => async (dispatch, getState) => {
    dispatch(getUomLoading());
    try {
        const { data } = await getUomRequest(formData, getState);
        dispatch(getUomSuccess(data))
    } catch (error) {
        dispatch(getUomReject(error))
    }
    return Promise.resolve();
};