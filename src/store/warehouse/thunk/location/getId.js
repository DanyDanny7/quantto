import {
    getLocationIdWarehouseLoading,
    getLocationIdWarehouseRequest,
    getLocationIdWarehouseSuccess,
    getLocationIdWarehouseReject,
} from "../../actions/location/getIdWarehouse";

export const getLocationIdWarehouse = (formData) => async (dispatch, getState) => {
    dispatch(getLocationIdWarehouseLoading());
    try {
        const { data } = await getLocationIdWarehouseRequest(formData, getState);
        dispatch(getLocationIdWarehouseSuccess(data))
    } catch (error) {
        dispatch(getLocationIdWarehouseReject(error))
    }
    return Promise.resolve();
};