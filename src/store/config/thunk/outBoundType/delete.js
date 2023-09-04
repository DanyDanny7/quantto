import {
    deleteOutBoundTypeReset,
    deleteOutBoundTypeLoading,
    deleteOutBoundTypeRequest,
    deleteOutBoundTypeSuccess,
    deleteOutBoundTypeReject,
} from "../../actions/subOutBoundType/delete";

export const deleteOutBoundType = (formData) => async (dispatch, getState) => {
    dispatch(deleteOutBoundTypeLoading());
    try {
        const { data } = await deleteOutBoundTypeRequest(formData, getState);
        dispatch(deleteOutBoundTypeSuccess(data))
    } catch (error) {
        dispatch(deleteOutBoundTypeReject(error))
    }
    setTimeout(() => {
        dispatch(deleteOutBoundTypeReset())
    }, 3000);
    return Promise.resolve();
};

