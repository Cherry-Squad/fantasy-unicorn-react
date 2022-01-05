import { delay } from "@utils/fake";
import { load, save } from "@utils/localStorage";

const getFakeStocks = () => JSON.parse(load("fake-stocks")) || [];
const setFakeStocks = (v) => save("fake-stocks", JSON.stringify(v));

export const createStockApi = ({ name }) =>
  delay(500).then(() => {
    const stocks = getFakeStocks();
    const stock = {
      id: Math.max(...[...stocks.map(({ id }) => id), 1]),
      name,
      created_at: new Date(),
      updated_at: new Date(),
    };
    stocks.push(stock);
    setFakeStocks(stocks);
    return {
      status: 201,
      data: stock,
    };
  });

export const getStockByIdApi = (id) =>
  delay(500).then(() => {
    const stocks = getFakeStocks();
    const data = stocks.find((s) => s.id === id);
    return data
      ? {
          status: 200,
          data,
        }
      : {
          status: 404,
          data: null,
        };
  });

export const getStockByNameApi = ({ name }) =>
  delay(500).then(() => {
    const stocks = getFakeStocks();
    const data = stocks.find((s) => s.name === name);
    return data
      ? {
          status: 200,
          data,
        }
      : {
          status: 404,
          data: null,
        };
  });
