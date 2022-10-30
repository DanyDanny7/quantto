import axios from 'axios';

import { root, baseAPi, userModule, loginPath } from "../../../assets/paths"

export const LOGIN_LOADING = 'LOGIN_LOADING';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_REJECT = 'LOGIN_REJECT';

const loginLoading = () => ({ type: LOGIN_LOADING });
const loginSuccess = (payload) => ({ type: LOGIN_SUCCESS, payload });
const loginReject = (payload) => ({ type: LOGIN_REJECT, payload });

export const login = (user) => async (dispatch, getState) => {
    dispatch(loginLoading())
    const path = `${root}${baseAPi}${userModule}${loginPath}`;
    axios.post(path, user)
        .then(({ data }) => {
            dispatch(loginSuccess(data))
        })
        .catch((error) => {
            dispatch(loginReject(error))
        });
}

