import { get } from "lodash";
import {
    getInventaryDetailPayingLoading,
    getInventaryDetailPayingRequest,
    getInventaryDetailPayingSuccess,
    getInventaryDetailPayingReject,
} from "../../../actions/inventary/detail/getDetailPaying";

export const getInventaryDetailPaying = (formData) => async (dispatch, getState) => {

    if (!get(getState(), "inventary.inventary.paying.isLoading", false)) {
        dispatch(getInventaryDetailPayingLoading());
        try {
            const { data } = await getInventaryDetailPayingRequest(formData, getState);
            dispatch(getInventaryDetailPayingSuccess(data))
        } catch (error) {
            dispatch(getInventaryDetailPayingReject(error))
        }
    }
    return Promise.resolve();
};