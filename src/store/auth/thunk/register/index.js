import { get, isEmpty } from "lodash";

import {
    registerLoading,
    registerReject,
    registerRequest,
    registerSuccess,
} from "../../actions/register";

export const register = (formData) => async (dispatch, getState) => {
    dispatch(registerLoading());
    try {
        const { data } = await registerRequest(formData);
        console.log(data)
        if (!isEmpty(get(data, "data", {}))) {
            dispatch(registerSuccess(data))
        } else {
            dispatch(registerReject(data))
        }
    } catch (error) {
        dispatch(registerReject(get(error, "response.data")))
    }
    return Promise.resolve();
};