import { addDaysToDate } from "@utils/date";
import { delay } from "@utils/fake";
import { remove, load, save } from "@utils/localStorage";

const getFakeBriefcase = () => JSON.parse(load("fake-briefcase"));
const deleteFakeBriefcase = () => remove("fake-briefcase");
const setFakeBriefcase = (v) => save("fake-briefcase", JSON.stringify(v));

export const getBriefcasesOfSelfUserApi = () =>
  delay(500).then(() => ({
    status: 200,
    data: getFakeBriefcase() ? [getFakeBriefcase()] : [],
  }));

export const deleteBriefcaseApi = (id) =>
  delay(500).then(() => {
    deleteFakeBriefcase();
    return {
      status: 204,
      data: null,
    };
  });

export const createBriefcaseApi = (userId) =>
  delay(500).then(() => {
    const data = setFakeBriefcase({
      id: 1,
      expiring_at: addDaysToDate(new Date(), 7),
      user_id: userId,
      created_at: new Date(),
      updated_at: new Date(),
      _linkedStocks: [],
    });
    return {
      status: 200,
      data,
    };
  });

export const updateBriefcaseApi = (id, { stock_id, add }) =>
  delay(500).then(() => {
    const prevState = getFakeBriefcase();
    const linked = [...prevState].filter((v) => v !== stock_id);
    if (add) linked.push(stock_id);
    const data = setFakeBriefcase({
      ...getFakeBriefcase(),
      _linkedStocks: linked,
    });
    return {
      status: 200,
      data,
    };
  });

export const getBriefcaseStocksByIdApi = (id) =>
  delay(500).then(() => {
    const data = getFakeBriefcase()?._linkedStocks;
    if (!!data) {
      return {
        status: 200,
        data,
      };
    } else {
      return {
        status: 404,
        data: null,
      };
    }
  });
