import { get } from "lodash";
import {
    getHistoryPaymentLoading,
    getHistoryPaymentRequest,
    getHistoryPaymentSuccess,
    getHistoryPaymentReject,
} from "../../actions/payment/HistoryPaymentGet";

export const getHistoryPayment = (formData) => async (dispatch, getState) => {
    if (!get(getState(), "history.historyPayment.isLoading", false)) {
        dispatch(getHistoryPaymentLoading());
        try {
            const { data } = await getHistoryPaymentRequest(formData, getState);
            dispatch(getHistoryPaymentSuccess(data))
        } catch (error) {
            dispatch(getHistoryPaymentReject(error))
        }
    }
    return Promise.resolve();
};