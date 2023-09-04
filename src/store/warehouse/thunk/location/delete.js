import {
    deleteLocationReset,
    deleteLocationLoading,
    deleteLocationRequest,
    deleteLocationSuccess,
    deleteLocationReject,
} from "../../actions/location/delete";

export const deleteLocation = (formData) => async (dispatch, getState) => {
    dispatch(deleteLocationLoading());
    try {
        const { data } = await deleteLocationRequest(formData, getState);
        dispatch(deleteLocationSuccess(data))
    } catch (error) {
        dispatch(deleteLocationReject(error))
    }
    setTimeout(() => {
        dispatch(deleteLocationReset())
    }, 3000);
    return Promise.resolve();
};

