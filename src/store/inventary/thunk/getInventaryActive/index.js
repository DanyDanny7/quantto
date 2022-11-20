import {
    getInventaryActiveLoading,
    getInventaryActiveRequest,
    getInventaryActiveSuccess,
    getInventaryActiveReject,
} from "../../actions/inventaryActive/InventaryActiveGet";

export const getInventaryActive = (formData) => async (dispatch, getState) => {
    dispatch(getInventaryActiveLoading());
    try {
        const { data } = await getInventaryActiveRequest(formData, getState);
        dispatch(getInventaryActiveSuccess(data))
    } catch (error) {
        dispatch(getInventaryActiveReject(error))
    }
    return Promise.resolve();
};