import { get } from "lodash";
import {
    getInventaryCountsLoading,
    getInventaryCountsRequest,
    getInventaryCountsSuccess,
    getInventaryCountsReject,
} from "../../../actions/inventary/counts/getCounts";

export const getInventaryCounts = (formData) => async (dispatch, getState) => {
    if (!get(getState(), "inventary.inventary.counts.isLoading", false)) {
        dispatch(getInventaryCountsLoading());
        try {
            const { data } = await getInventaryCountsRequest(formData, getState);
            dispatch(getInventaryCountsSuccess(data))
        } catch (error) {
            dispatch(getInventaryCountsReject(error))
        }
    }
    return Promise.resolve();
};