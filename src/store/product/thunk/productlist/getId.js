import {
    getListProductIdLoading,
    getListProductIdRequest,
    getListProductIdSuccess,
    getListProductIdReject,
} from "../../actions/productlist/getId";

export const getListProductId = (formData) => async (dispatch, getState) => {
    dispatch(getListProductIdLoading());
    try {
        const { data } = await getListProductIdRequest(formData, getState);
        dispatch(getListProductIdSuccess(data))
    } catch (error) {
        dispatch(getListProductIdReject(error))
    }
    return Promise.resolve();
};