import { normalize } from "normalizr";
import { createAsyncThunkWrapped } from "@utils/thunkWrapper";
import {
  createBriefcaseApi,
  deleteBriefcaseApi,
  getBriefcasesOfSelfUserApi,
  updateBriefcaseApi,
} from "@api/briefcase";
import { briefcase } from "@validation/normalizr";
import { unwrapResult } from "@reduxjs/toolkit";

export const getBriefcaseOfSelfUserThunk = createAsyncThunkWrapped(
  "briefcases/getBriefcaseOfSelfUser",
  async () => {
    const response = await getBriefcasesOfSelfUserApi();
    return normalize(response.data[0], briefcase);
  }
);

export const createBriefcaseThunk = createAsyncThunkWrapped(
  "briefcases/createBriefcase",
  async (_, { state }) => {
    const response = await createBriefcaseApi(state.auth.user.id);
    return normalize(response.data, briefcase);
  }
);

export const deleteBriefcaseThunk = createAsyncThunkWrapped(
  "briefcases/deleteBriefcase",
  async ({ id }) => {
    await deleteBriefcaseApi(id);
    return { id };
  }
);

export const refreshBriefcaseThunk = createAsyncThunkWrapped(
  "briefcases/refresh",
  async ({ userId }, { dispatch }) => {
    const getResult = await dispatch(getBriefcaseOfSelfUserThunk()).then(
      unwrapResult
    );
    const briefcaseId = getResult.result
      ? getResult.entities.briefcases[getResult.result].id
      : null;
    if (briefcaseId) {
      await dispatch(deleteBriefcaseApi({ id: briefcaseId })).then(
        unwrapResult
      );
    }
    const createResult = await dispatch(createBriefcaseThunk()).then(
      unwrapResult
    );
    return { prevId: briefcaseId, newBriefcase: createResult };
  }
);

export const addStockToBriefcaseThunk = createAsyncThunkWrapped(
  "briefcases/addStock",
  async ({ stockId, briefcaseId }) => {
    const response = await updateBriefcaseApi(briefcaseId, {
      stock_id: stockId,
      add: true,
    });
    return normalize(response.data, briefcase);
  }
);

export const removeStockFromBriefcaseThunk = createAsyncThunkWrapped(
  "briefcases/removeStock",
  async ({ stockId, briefcaseId }) => {
    const response = await updateBriefcaseApi(briefcaseId, {
      stock_id: stockId,
      add: false,
    });
    return normalize(response.data, briefcase);
  }
);
