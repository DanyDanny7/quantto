import { get, isEmpty } from "lodash";

import {
    loginLoading,
    loginReject,
    loginRequest,
    loginSuccess,
} from "../../../actions/auth/login";

export const login = (formData) => async (dispatch, getState) => {
    dispatch(loginLoading());
    try {
        const { data } = await loginRequest(formData);
        if (!isEmpty(get(data, "data", {}))) {
            dispatch(loginSuccess(data))
        } else {
            dispatch(loginReject(data))
        }
    } catch (error) {
        dispatch(loginReject(error))
    }
    return Promise.resolve();
};