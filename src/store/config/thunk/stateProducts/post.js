import {
    postStateProductsReset,
    postStateProductsLoading,
    postStateProductsRequest,
    postStateProductsSuccess,
    postStateProductsReject,
} from "../../actions/stateProducts/post";

export const postStateProducts = (formData) => async (dispatch, getState) => {
    dispatch(postStateProductsLoading());
    try {
        const { data } = await postStateProductsRequest(formData, getState);
        dispatch(postStateProductsSuccess(data))
    } catch (error) {
        dispatch(postStateProductsReject(error))
    }
    setTimeout(() => {
        dispatch(postStateProductsReset())
    }, 3000);
    return Promise.resolve();
};

