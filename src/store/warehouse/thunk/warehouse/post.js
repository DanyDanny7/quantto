import {
    postWarehouseReset,
    postWarehouseLoading,
    postWarehouseRequest,
    postWarehouseSuccess,
    postWarehouseReject,
} from "../../actions/warehouse/post";

export const postWarehouse = (formData) => async (dispatch, getState) => {
    dispatch(postWarehouseLoading());
    try {
        const { data } = await postWarehouseRequest(formData, getState);
        dispatch(postWarehouseSuccess(data))
    } catch (error) {
        dispatch(postWarehouseReject(error))
    }
    setTimeout(() => {
        dispatch(postWarehouseReset())
    }, 3000);
    return Promise.resolve();
};

