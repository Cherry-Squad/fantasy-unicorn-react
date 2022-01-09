const { mainAxios } = require("./utils");

export const getApplicationStocksForContestApi = (contest_id) =>
  mainAxios.get(`/contest_application_stocks/?contest_id=${contest_id}`);
