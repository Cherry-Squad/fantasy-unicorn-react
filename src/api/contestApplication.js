import { mainAxios } from "./utils";

export const getAllApplicationsForCurrentUserApi = () =>
  mainAxios.get(`/contest_applications/`);

export const getAllApplicationsInContestApi = (contest_id) =>
  mainAxios.get(`/contest_applications/?contest_id=${contest_id}`);

export const deleteApplicationApi = (id) =>
  mainAxios.delete(`/contest_applications/${id}/`);
