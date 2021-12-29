import * as axios from "axios";
import Qs from "qs";

const ip = process.env.REACT_APP_BACKEND_URL;

const defaultHeaders = {};

const defaultBodyHeaders = {
  ...defaultHeaders,
  "Content-Type": "application/json",
};

const okOnly = (status) => status === 200;

export const basicAxios = () =>
  axios.create({
    baseURL: ip,
    headers: defaultBodyHeaders,
    validateStatus: okOnly,
  });

export const mainAxios = axios.create({
  baseURL: ip,
  headers: defaultBodyHeaders,
  validateStatus: okOnly,
  paramsSerializer: (params) => Qs.stringify(params, { arrayFormat: "repeat" }),
});
