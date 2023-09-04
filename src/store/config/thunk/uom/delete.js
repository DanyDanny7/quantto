import {
    deleteUomReset,
    deleteUomLoading,
    deleteUomRequest,
    deleteUomSuccess,
    deleteUomReject,
} from "../../actions/uom/delete";

export const deleteUom = (formData) => async (dispatch, getState) => {
    dispatch(deleteUomLoading());
    try {
        const { data } = await deleteUomRequest(formData, getState);
        dispatch(deleteUomSuccess(data))
    } catch (error) {
        dispatch(deleteUomReject(error))
    }
    setTimeout(() => {
        dispatch(deleteUomReset())
    }, 3000);
    return Promise.resolve();
};

