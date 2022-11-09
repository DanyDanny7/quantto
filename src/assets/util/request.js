/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";
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

export const withToken = async (options) => {
  // const token = await localStorage.getItem("token");

  return {
    ...options,
    // token
  };
};

export const getOptions = ({
  data,
  method,
  token = null,
  headers: extraHeaders = {},
  params = {},
  // companyId,
  // userId
}) => {
  const headers = {
    // userId: userId,
    // CompanyId: companyId,
    Accept: "application/json",
    ...JSONBody,
    ...extraHeaders,
  };

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
