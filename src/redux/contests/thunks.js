import { contest, contestApplicationStocks } from "@validation/normalizr";
import { createAsyncThunkWrapped } from "@utils/thunkWrapper";
import {
  getAllContestsApi,
  getContestByIdApi,
  registerOnContestApi,
} from "@api/contest";
import { myNormalize } from "@utils/redux";
import { getApplicationsOfContestThunk } from "@redux/contestApplications";
import { unwrapResult } from "@reduxjs/toolkit";
import { subCoins } from "@redux/users";

export const getAllContestsThunk = createAsyncThunkWrapped(
  "contests/getAllContests",
  async () => {
    const response = await getAllContestsApi();
    return myNormalize(response.data, [contest]);
  }
);

export const getContestByIdThunk = createAsyncThunkWrapped(
  "contests/getContestById",
  async ({ id }) => {
    const response = await getContestByIdApi(id);
    return myNormalize(response.data, contest);
  }
);

export const registerOnContestThunk = createAsyncThunkWrapped(
  "contests/registerOnContest",
  async (
    { contestId, stocks, directions, multipliers, userId, payment },
    { dispatch }
  ) => {
    const response = await registerOnContestApi(contestId, {
      items: stocks.map(({ id }) => ({
        stock_id: id,
        multiplier: +multipliers[id].substring(1),
        direction_up: directions[id] === "up",
      })),
    });
    await dispatch(getApplicationsOfContestThunk({ contestId })).then(
      unwrapResult
    );
    dispatch(subCoins({ userId, payment }));
    return myNormalize(response.data.contest_app_stocks, [
      contestApplicationStocks,
    ]);
  }
);
