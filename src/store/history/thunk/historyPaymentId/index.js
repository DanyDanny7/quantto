import { get } from "lodash";
import {
    getHistoryPaymentIdLoading,
    getHistoryPaymentIdRequest,
    getHistoryPaymentIdSuccess,
    getHistoryPaymentIdReject,
} from "../../actions/payment/HistoryPaymentId";

export const getHistoryPaymentId = (formData) => async (dispatch, getState) => {
    if (!get(getState(), "history.historyPayment.detail.isLoading", false)) {
        dispatch(getHistoryPaymentIdLoading());
        try {
            const { data } = await getHistoryPaymentIdRequest(formData, getState);
            dispatch(getHistoryPaymentIdSuccess(data))
        } catch (error) {
            dispatch(getHistoryPaymentIdReject(error))
        }
    }
    return Promise.resolve();
};