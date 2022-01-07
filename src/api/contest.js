import { mainAxios } from "./utils";

export const getAllContestsApi = () => mainAxios.get(`/contests/`);

export const getContestByIdApi = (id) => mainAxios.get(`/contests/${id}/`);
