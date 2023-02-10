/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";
import { get } from "lodash";
// import qs from "qs";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3000";

export const URLEncoded = {
  "Content-Type": "application/x-www-form-urlencoded",
};

export const Multipart = {
  "Content-Type": "multipart/form-data",
};

export const JSONBody = {
  "Content-Type": "application/json",
};

export const RequestType = {
  URLEncoded,
  Multipart,
  JSONBody,
};

export const Methods = {
  HEAD: "head",
  GET: "get",
  POST: "post",
  PUT: "put",
  PATCH: "patch",
  DELETE: "delete",
};

export const withToken = async (options, getState = () => { }) => {
  console.log(getState())
  return {
    ...options,
    token: get(getState(), "auth.login.dataUser.token"),
    jwt: get(getState(), "auth.login.dataUser.jwt"),
    userid: get(getState(), "auth.login.dataUser.userId"),
    companyid: get(getState(), "auth.login.dataUser.companyId"),
    language: localStorage.getItem("lang") || "en"
  };
};

export const getOptions = ({
  data,
  method,
  token = null,
  headers: extraHeaders = {},
  params = {},
  companyid,
  userid,
  language,
  jwt,
}) => {
  const headers = {
    userid: userid,
    companyid: companyid,
    Accept: "application/json",
    ...JSONBody,
    ...extraHeaders,
  };
  if (token) {
    headers.Authorization = `Bearer ${jwt}`;
  }

  const options = {
    baseURL: API_URL,
    method,
    data,
    headers,
    params: { companyid, userid, language, ...params },
    // paramsSerializer: (params) => {
    //   return qs.stringify(params, { encode: false });
    // },
  };

  return options;
};

export default (url, options) => axios({ url, ...getOptions(options) });
