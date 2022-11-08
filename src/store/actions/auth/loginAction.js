import axios from 'axios';
import { isEmpty, get } from "lodash";

import { root, baseAPi, userModule, loginPath } from "../../../assets/paths"

export const LOGIN_LOADING = 'LOGIN_LOADING';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_REJECT = 'LOGIN_REJECT';

export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';

const loginLoading = () => ({ type: LOGIN_LOADING });
const loginSuccess = (payload) => ({ type: LOGIN_SUCCESS, payload });
const loginReject = (payload) => ({ type: LOGIN_REJECT, payload });

const logoutSuccess = () => ({ type: LOGOUT_SUCCESS });

export const login = (user) => async (dispatch, getState) => {
    dispatch(loginLoading())
    const path = `${root}${baseAPi}${userModule}${loginPath}`;
    axios.post(path, user)
        .then(({ data }) => {
            if (!isEmpty(get(data, "data", {}))) {
                dispatch(loginSuccess(data))
            } else {
                dispatch(loginReject(data))
            }
        })
        .catch((error) => {
            dispatch(loginReject(error))
        });
}

export const logout = () => (dispatch, getState) => {
    const path = ""
    dispatch(logoutSuccess())
    axios.post(path)
}

