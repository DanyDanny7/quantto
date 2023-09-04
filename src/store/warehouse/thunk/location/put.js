import {
    putLocationReset,
    putLocationLoading,
    putLocationRequest,
    putLocationSuccess,
    putLocationReject,
} from "../../actions/location/put";

export const putLocation = (formData) => async (dispatch, getState) => {
    dispatch(putLocationLoading());
    try {
        const { data } = await putLocationRequest(formData, getState);
        dispatch(putLocationSuccess(data))
    } catch (error) {
        dispatch(putLocationReject(error))
    }
    setTimeout(() => {
        dispatch(putLocationReset())
    }, 3000);
    return Promise.resolve();
};

