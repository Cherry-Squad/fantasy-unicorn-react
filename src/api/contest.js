import { DirectionStrategyEnum, StatusEnum } from "@dict/contest";
import { delay } from "@utils/fake";
import { addDaysToDate, minusHoursToDate, addHoursToDate } from "../utils/date";
import { mainAxios } from "./utils";

// export const getAllContestsApi = () => mainAxios.get("/contest");

const fakeContests = {
  1: {
    id: 1,
    reg_ending_at: addHoursToDate(new Date(), 12).toISOString(),
    summarizing_at: addDaysToDate(new Date(), 1).toISOString(),
    status: StatusEnum.CREATED,
    coins_entry_fee: 100,
    max_fantasy_points_threshold: 500,
    use_briefcase_only: true,
    direction_strategy: DirectionStrategyEnum.FREE,
    fixed_direction_up: null,
    use_disabled_multipliers: false,
    use_inverted_stock_prices: false,
    created_at: minusHoursToDate(new Date(), 12).toISOString(),
    updated_at: new Date().toISOString(),
  },
  2: {
    id: 2,
    reg_ending_at: addHoursToDate(new Date(), 1).toISOString(),
    summarizing_at: addDaysToDate(new Date(), 6).toISOString(),
    status: StatusEnum.CREATED,
    coins_entry_fee: 50,
    max_fantasy_points_threshold: 1000,
    use_briefcase_only: false,
    direction_strategy: DirectionStrategyEnum.SINGLE_PER_USER,
    fixed_direction_up: null,
    use_disabled_multipliers: false,
    use_inverted_stock_prices: false,
    created_at: minusHoursToDate(new Date(), 6).toISOString(),
    updated_at: new Date().toISOString(),
  },
};

export const getAllContestsApi = () =>
  delay(500).then(() => ({
    status: 200,
    data: Object.values(fakeContests),
  }));

export const getContestByIdApi = (id) =>
  delay(500).then(() =>
    fakeContests[id]
      ? {
          status: 200,
          data: fakeContests[id],
        }
      : {
          status: 404,
          data: null,
        }
  );
