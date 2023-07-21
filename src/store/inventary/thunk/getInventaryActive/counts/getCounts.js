import {
    getInventaryActiveCountsLoading,
    getInventaryActiveCountsRequest,
    getInventaryActiveCountsSuccess,
    getInventaryActiveCountsReject,
} from "../../../actions/inventaryActive/counts/getCounts";

export const getInventaryactive = (formData) => async (dispatch, getState) => {
    dispatch(getInventaryActiveCountsLoading());
    try {
        const { data } = await getInventaryActiveCountsRequest(formData, getState);
        dispatch(getInventaryActiveCountsSuccess(data))
    } catch (error) {
        dispatch(getInventaryActiveCountsReject(error))
    }
    return Promise.resolve();
};