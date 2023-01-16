import { get } from "lodash";
import {
    getInventaryLoading,
    getInventaryRequest,
    getInventarySuccess,
    getInventaryReject,
} from "../../actions/inventary/getInventary";

export const getInventary = (formData) => async (dispatch, getState) => {
    if (!get(getState(), "inventary.inventary.isLoading", false)) {
        dispatch(getInventaryLoading());
        try {
            const { data } = await getInventaryRequest(formData, getState);
            dispatch(getInventarySuccess(data))
        } catch (error) {
            dispatch(getInventaryReject(error))
        }
    }
    return Promise.resolve();
};