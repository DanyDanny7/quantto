import {
    getInventaryLoading,
    getInventaryRequest,
    getInventarySuccess,
    getInventaryReject,
} from "../../actions/inventary/getInventary";

export const getInventary = (formData) => async (dispatch, getState) => {
    dispatch(getInventaryLoading());
    try {
        const { data } = await getInventaryRequest(formData, getState);
        dispatch(getInventarySuccess(data))
    } catch (error) {
        dispatch(getInventaryReject(error))
    }
    return Promise.resolve();
};