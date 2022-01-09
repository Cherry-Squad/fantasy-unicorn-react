import { mainAxios } from "./utils";

export const getAllContestsApi = () =>
  mainAxios.get(`/contests/?status=created,reg_ended`);

export const getContestByIdApi = (id) => mainAxios.get(`/contests/${id}/`);

export const registerOnContestApi = (id, { items }) =>
  mainAxios.post(`/contests/${id}/register`, { items });
