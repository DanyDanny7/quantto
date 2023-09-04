import {
    getStateProductsIdLoading,
    getStateProductsIdRequest,
    getStateProductsIdSuccess,
    getStateProductsIdReject,
} from "../../actions/stateProducts/getId";

export const getStateProductsId = (formData) => async (dispatch, getState) => {
    dispatch(getStateProductsIdLoading());
    try {
        const { data } = await getStateProductsIdRequest(formData, getState);
        dispatch(getStateProductsIdSuccess(data))
    } catch (error) {
        dispatch(getStateProductsIdReject(error))
    }
    return Promise.resolve();
};