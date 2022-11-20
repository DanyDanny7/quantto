import {
    logoutRequest,
    logoutSuccess
} from "../../actions/logout";

export const logout = (formData) => async (dispatch, getState) => {
    try {
        await logoutRequest(formData, getState);
    } catch (error) { }
    dispatch(logoutSuccess())
    return Promise.resolve();
};

