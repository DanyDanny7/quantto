import {
    getWarehouseLoading,
    getWarehouseRequest,
    getWarehouseSuccess,
    getWarehouseReject,
} from "../../actions/warehouse/get";

export const getWarehouse = (formData) => async (dispatch, getState) => {
    dispatch(getWarehouseLoading());
    try {
        const { data } = await getWarehouseRequest(formData, getState);
        dispatch(getWarehouseSuccess(data))
    } catch (error) {
        dispatch(getWarehouseReject(error))
    }
    return Promise.resolve();
};