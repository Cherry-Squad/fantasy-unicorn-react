import { mainAxios } from "./utils";

export const createStockApi = ({ name }) =>
  mainAxios.post(`/stocks/`, { name });

export const getStockByIdApi = (id) => mainAxios.get(`/stocks/${id}`);

export const getStockByNameApi = ({ name }) =>
  mainAxios.get(`/stocks/name/${name}/`);

export const getTenExampleStocksApi = () =>
  mainAxios.get("/stocks/suggestions/");
