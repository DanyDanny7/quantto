import {
    putUomProductReset,
    putUomProductLoading,
    putUomProductRequest,
    putUomProductSuccess,
    putUomProductReject,
} from "../../actions/productuom/put";

export const putUomProduct = (formData) => async (dispatch, getState) => {
    dispatch(putUomProductLoading());
    try {
        const { data } = await putUomProductRequest(formData, getState);
        dispatch(putUomProductSuccess(data))
    } catch (error) {
        dispatch(putUomProductReject(error))
    }
    setTimeout(() => {
        dispatch(putUomProductReset())
    }, 3000);
    return Promise.resolve();
};

