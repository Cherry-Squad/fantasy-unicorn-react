import * as axios from "axios";
import { Ip } from "@config";
import Qs from "qs";

const defaultHeaders = {};

const defaultBodyHeaders = {
  ...defaultHeaders,
  "Content-Type": "application/json",
};

const okOnly = (status) => status === 200;

export const basicAxios = () =>
  axios.create({
    baseURL: Ip(),
    headers: defaultBodyHeaders,
    validateStatus: okOnly,
  });

export const mainAxios = axios.create({
  baseURL: Ip(),
  headers: defaultBodyHeaders,
  validateStatus: okOnly,
  paramsSerializer: (params) => Qs.stringify(params, { arrayFormat: "repeat" }),
});
