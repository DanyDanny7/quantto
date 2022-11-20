import {
    getInventaryDetailLoading,
    getInventaryDetailRequest,
    getInventaryDetailSuccess,
    getInventaryDetailReject,
} from "../../../actions/inventary/detail/getDetail";

export const getInventaryDetail = (formData) => async (dispatch, getState) => {
    dispatch(getInventaryDetailLoading());
    try {
        const { data } = await getInventaryDetailRequest(formData, getState);
        dispatch(getInventaryDetailSuccess(data))
    } catch (error) {
        dispatch(getInventaryDetailReject(error))
    }
    return Promise.resolve();
};