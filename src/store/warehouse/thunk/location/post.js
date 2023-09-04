import {
    postLocationReset,
    postLocationLoading,
    postLocationRequest,
    postLocationSuccess,
    postLocationReject,
} from "../../actions/location/post";

export const postLocation = (formData) => async (dispatch, getState) => {
    dispatch(postLocationLoading());
    try {
        const { data } = await postLocationRequest(formData, getState);
        dispatch(postLocationSuccess(data))
    } catch (error) {
        dispatch(postLocationReject(error))
    }
    setTimeout(() => {
        dispatch(postLocationReset())
    }, 3000);
    return Promise.resolve();
};

