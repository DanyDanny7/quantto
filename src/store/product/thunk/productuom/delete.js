import {
    deleteUomProductReset,
    deleteUomProductLoading,
    deleteUomProductRequest,
    deleteUomProductSuccess,
    deleteUomProductReject,
} from "../../actions/productuom/delete";

export const deleteUomProduct = (formData) => async (dispatch, getState) => {
    dispatch(deleteUomProductLoading());
    try {
        const { data } = await deleteUomProductRequest(formData, getState);
        dispatch(deleteUomProductSuccess(data))
    } catch (error) {
        dispatch(deleteUomProductReject(error))
    }
    setTimeout(() => {
        dispatch(deleteUomProductReset())
    }, 3000);
    return Promise.resolve();
};

