import { get } from "lodash";
import {
    getCountsLoading,
    getCountsRequest,
    getCountsSuccess,
    getCountsReject,
} from "../../actions/getCounts";

export const getCounts = (formData) => async (dispatch, getState) => {
    if (!get(getState(), "counts.isLoading", false)) {
        dispatch(getCountsLoading());
        try {
            const { data } = await getCountsRequest(formData, getState);
            dispatch(getCountsSuccess(data))
        } catch (error) {
            dispatch(getCountsReject(error))
        }
    }
    return Promise.resolve();
};