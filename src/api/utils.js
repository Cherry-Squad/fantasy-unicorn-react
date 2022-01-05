import * as axios from "axios";
import Qs from "qs";

const ip = process.env.REACT_APP_BACKEND_URL;

const defaultHeaders = {};

const defaultBodyHeaders = {
  ...defaultHeaders,
  "Content-Type": "application/json",
};

const okAndCreatedOnly = (status) => [200, 201].includes(status);

export const basicAxios = () =>
  axios.create({
    baseURL: ip,
    headers: defaultBodyHeaders,
    validateStatus: okAndCreatedOnly,
  });

export const mainAxios = axios.create({
  baseURL: ip,
  headers: defaultBodyHeaders,
  validateStatus: okAndCreatedOnly,
  paramsSerializer: (params) => Qs.stringify(params, { arrayFormat: "repeat" }),
});
