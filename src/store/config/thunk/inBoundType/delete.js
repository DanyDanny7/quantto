import {
    deleteInBoundTypeReset,
    deleteInBoundTypeLoading,
    deleteInBoundTypeRequest,
    deleteInBoundTypeSuccess,
    deleteInBoundTypeReject,
} from "../../actions/subInBoundType/delete";

export const deleteInBoundType = (formData) => async (dispatch, getState) => {
    dispatch(deleteInBoundTypeLoading());
    try {
        const { data } = await deleteInBoundTypeRequest(formData, getState);
        dispatch(deleteInBoundTypeSuccess(data))
    } catch (error) {
        dispatch(deleteInBoundTypeReject(error))
    }
    setTimeout(() => {
        dispatch(deleteInBoundTypeReset())
    }, 3000);
    return Promise.resolve();
};

