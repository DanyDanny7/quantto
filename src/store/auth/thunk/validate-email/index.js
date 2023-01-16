import { get, isEmpty } from "lodash";

import {
    postValidateEmailLoading,
    postValidateEmailReject,
    postValidateEmailRequest,
    postValidateEmailSuccess,
} from "../../actions/postValidate";

export const postValidateEmail = (formData) => async (dispatch, getState) => {
    dispatch(postValidateEmailLoading());
    try {
        const { data } = await postValidateEmailRequest(formData, getState);
        // unicamente se actualiza el estado para identificar que ya se valido
        const dataUser = get(getState(), "auth.login.dataUser")
        dataUser.active = "True"
        const login = get(getState(), "auth.login")
        const dataLogin = { ...login, dataUser, allResp: { ...login.allResp, data: dataUser } }
        dispatch(postValidateEmailSuccess(dataLogin))
    } catch (error) {
        dispatch(postValidateEmailReject(get(error, "response.data")))
    }
    return Promise.resolve();
};