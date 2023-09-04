import {
    putStateProductsReset,
    putStateProductsLoading,
    putStateProductsRequest,
    putStateProductsSuccess,
    putStateProductsReject,
} from "../../actions/stateProducts/put";

export const putStateProducts = (formData) => async (dispatch, getState) => {
    dispatch(putStateProductsLoading());
    try {
        const { data } = await putStateProductsRequest(formData, getState);
        dispatch(putStateProductsSuccess(data))
    } catch (error) {
        dispatch(putStateProductsReject(error))
    }
    setTimeout(() => {
        dispatch(putStateProductsReset())
    }, 3000);
    return Promise.resolve();
};

