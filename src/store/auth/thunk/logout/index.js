import {
    logoutRequest,
    logoutSuccess
} from "../../actions/logout";

export const logout = (formData) => async (dispatch, getState) => {
    try {
        await logoutRequest(formData, getState);
    } catch (error) { }
    await dispatch(logoutSuccess())
    return Promise.resolve();
};


export const toLogout = () => async (dispatch, getState) => {
    await dispatch(logoutSuccess())
    return Promise.resolve();
};