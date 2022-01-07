import { mainAxios } from "./utils";

export const getBriefcasesOfSelfUserApi = () => mainAxios.get("/briefcases/");

export const deleteBriefcaseApi = (id) => mainAxios.delete(`/briefcases/${id}`);

export const createBriefcaseApi = () => mainAxios.post(`/briefcases/`);

export const updateBriefcaseApi = (id, { stock_id, add }) =>
  mainAxios.patch(`/briefcases/${id}/`, { stock_id, add });

export const getBriefcaseStocksByIdApi = (id) =>
  mainAxios.get(`/briefcases/${id}/stocks/`);
