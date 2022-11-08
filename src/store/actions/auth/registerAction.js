import axios from 'axios';
import { isEmpty, get } from "lodash";

import { root, baseAPi, userModule, registerPath } from "../../../assets/paths"

export const REGISTER_LOADING = 'REGISTER_LOADING';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_REJECT = 'REGISTER_REJECT';

const registerLoading = () => ({ type: REGISTER_LOADING });
const registerSuccess = (payload) => ({ type: REGISTER_SUCCESS, payload });
const registerReject = (payload) => ({ type: REGISTER_REJECT, payload });


export const register = (user) => async (dispatch, getState) => {
    dispatch(registerLoading())
    const path = `${root}${baseAPi}${userModule}${registerPath}`;
    axios.post(path, user)
        .then(({ data }) => {
            if (!isEmpty(get(data, "data", {}))) {
                dispatch(registerSuccess(data))
            } else {
                dispatch(registerReject(data))
            }
        })
        .catch((error) => {
            dispatch(registerReject(error))
        });
}



