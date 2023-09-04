import {
    deleteWarehouseReset,
    deleteWarehouseLoading,
    deleteWarehouseRequest,
    deleteWarehouseSuccess,
    deleteWarehouseReject,
} from "../../actions/warehouse/delete";

export const deleteWarehouse = (formData) => async (dispatch, getState) => {
    dispatch(deleteWarehouseLoading());
    try {
        const { data } = await deleteWarehouseRequest(formData, getState);
        dispatch(deleteWarehouseSuccess(data))
    } catch (error) {
        dispatch(deleteWarehouseReject(error))
    }
    setTimeout(() => {
        dispatch(deleteWarehouseReset())
    }, 3000);
    return Promise.resolve();
};

