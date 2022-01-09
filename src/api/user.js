import { mainAxios } from "./utils";

export const getScoreboardApi = () => mainAxios.get(`/users/scoreboard/`);
