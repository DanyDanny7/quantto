import {
    getInventaryCountsLoading,
    getInventaryCountsRequest,
    getInventaryCountsSuccess,
    getInventaryCountsReject,
} from "../../../actions/inventary/counts/getCounts";

export const getInventaryCounts = (formData) => async (dispatch, getState) => {
    dispatch(getInventaryCountsLoading());
    try {
        const { data } = await getInventaryCountsRequest(formData, getState);
        dispatch(getInventaryCountsSuccess(data))
    } catch (error) {
        dispatch(getInventaryCountsReject(error))
    }
    return Promise.resolve();
};