import {
    deleteStateProductsReset,
    deleteStateProductsLoading,
    deleteStateProductsRequest,
    deleteStateProductsSuccess,
    deleteStateProductsReject,
} from "../../actions/stateProducts/delete";

export const deleteStateProducts = (formData) => async (dispatch, getState) => {
    dispatch(deleteStateProductsLoading());
    try {
        const { data } = await deleteStateProductsRequest(formData, getState);
        dispatch(deleteStateProductsSuccess(data))
    } catch (error) {
        dispatch(deleteStateProductsReject(error))
    }
    setTimeout(() => {
        dispatch(deleteStateProductsReset())
    }, 3000);
    return Promise.resolve();
};

