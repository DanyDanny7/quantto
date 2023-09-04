import {
    putWarehouseReset,
    putWarehouseLoading,
    putWarehouseRequest,
    putWarehouseSuccess,
    putWarehouseReject,
} from "../../actions/warehouse/put";

export const putWarehouse = (formData) => async (dispatch, getState) => {
    dispatch(putWarehouseLoading());
    try {
        const { data } = await putWarehouseRequest(formData, getState);
        dispatch(putWarehouseSuccess(data))
    } catch (error) {
        dispatch(putWarehouseReject(error))
    }
    setTimeout(() => {
        dispatch(putWarehouseReset())
    }, 3000);
    return Promise.resolve();
};

