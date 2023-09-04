import {
    getLocationLoading,
    getLocationRequest,
    getLocationSuccess,
    getLocationReject,
} from "../../actions/location/get";

export const getLocation = (formData) => async (dispatch, getState) => {
    dispatch(getLocationLoading());
    try {
        const { data } = await getLocationRequest(formData, getState);
        dispatch(getLocationSuccess(data))
    } catch (error) {
        dispatch(getLocationReject(error))
    }
    return Promise.resolve();
};