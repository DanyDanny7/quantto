import {
    logoutRequest,
    logoutSuccess
} from "../../../actions/auth/logout";

export const logout = (formData) => async (dispatch, getState) => {
    try {
        await logoutRequest(formData);
    } catch (error) { }
    dispatch(logoutSuccess())
    return Promise.resolve();
};

