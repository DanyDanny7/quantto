import {
    getWarehouseIdLoading,
    getWarehouseIdRequest,
    getWarehouseIdSuccess,
    getWarehouseIdReject,
} from "../../actions/warehouse/getId";

export const getWarehouseId = (formData) => async (dispatch, getState) => {
    dispatch(getWarehouseIdLoading());
    try {
        const { data } = await getWarehouseIdRequest(formData, getState);
        dispatch(getWarehouseIdSuccess(data))
    } catch (error) {
        dispatch(getWarehouseIdReject(error))
    }
    return Promise.resolve();
};