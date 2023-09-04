import {
    putUomReset,
    putUomLoading,
    putUomRequest,
    putUomSuccess,
    putUomReject,
} from "../../actions/uom/put";

export const putUom = (formData) => async (dispatch, getState) => {
    dispatch(putUomLoading());
    try {
        const { data } = await putUomRequest(formData, getState);
        dispatch(putUomSuccess(data))
    } catch (error) {
        dispatch(putUomReject(error))
    }
    setTimeout(() => {
        dispatch(putUomReset())
    }, 3000);
    return Promise.resolve();
};

