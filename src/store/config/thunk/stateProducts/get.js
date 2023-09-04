import {
    getStateProductsLoading,
    getStateProductsRequest,
    getStateProductsSuccess,
    getStateProductsReject,
} from "../../actions/stateProducts/get";

export const getStateProducts = (formData) => async (dispatch, getState) => {
    dispatch(getStateProductsLoading());
    try {
        const { data } = await getStateProductsRequest(formData, getState);
        dispatch(getStateProductsSuccess(data))
    } catch (error) {
        dispatch(getStateProductsReject(error))
    }
    return Promise.resolve();
};