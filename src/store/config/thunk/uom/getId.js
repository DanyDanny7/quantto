import {
    getUomIdLoading,
    getUomIdRequest,
    getUomIdSuccess,
    getUomIdReject,
} from "../../actions/uom/getId";

export const getUomId = (formData) => async (dispatch, getState) => {
    dispatch(getUomIdLoading());
    try {
        const { data } = await getUomIdRequest(formData, getState);
        dispatch(getUomIdSuccess(data))
    } catch (error) {
        dispatch(getUomIdReject(error))
    }
    return Promise.resolve();
};