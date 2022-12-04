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
  return {
    ...options,
    token: get(getState(), "auth.login.dataUser.token"),
    userId: get(getState(), "auth.login.dataUser.userId"),
    companyId: get(getState(), "auth.login.dataUser.companyId"),
  };
};

export const getOptions = ({
  data,
  method,
  token = null,
  headers: extraHeaders = {},
  params = {},
  companyId,
  userId,
}) => {
  const headers = {
    UserId: userId,
    CompanyId: companyId,
    Accept: "application/json",
    ...JSONBody,
    ...extraHeaders,
  };
  console.log(headers)
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const options = {
    baseURL: API_URL,
    method,
    data,
    headers,
    params,
    // paramsSerializer: (params) => {
    //   return qs.stringify(params, { encode: false });
    // },
  };

  return options;
};

export default (url, options) => axios({ url, ...getOptions(options) });
