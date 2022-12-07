import {
    getCountsLoading,
    getCountsRequest,
    getCountsSuccess,
    getCountsReject,
} from "../../actions/getCounts";

export const getCounts = (formData) => async (dispatch, getState) => {
    dispatch(getCountsLoading());
    try {
        const { data } = await getCountsRequest(formData, getState);
        dispatch(getCountsSuccess(data))
    } catch (error) {
        dispatch(getCountsReject(error))
    }
    return Promise.resolve();
};