import { normalize } from "normalizr";
import { createAsyncThunkWrapped } from "@utils/thunkWrapper";
import {
  createBriefcaseApi,
  deleteBriefcaseApi,
  getBriefcasesOfSelfUserApi,
  getBriefcaseStocksByIdApi,
  updateBriefcaseApi,
} from "@api/briefcase";
import { briefcase, stock } from "@validation/normalizr";
import { unwrapResult } from "@reduxjs/toolkit";

export const getStocksOfBriefcaseThunk = createAsyncThunkWrapped(
  "briefcases/getStocksOfBriefcase",
  async ({ briefcaseId }) => {
    const response = await getBriefcaseStocksByIdApi(briefcaseId);
    return normalize(response.data || [], [stock]);
  }
);

export const getBriefcaseOfSelfUserThunk = createAsyncThunkWrapped(
  "briefcases/getBriefcaseOfSelfUser",
  async () => {
    const response = await getBriefcasesOfSelfUserApi();
    return normalize(response.data?.[0] || {}, briefcase);
  }
);

export const createBriefcaseThunk = createAsyncThunkWrapped(
  "briefcases/createBriefcase",
  async (_, { getState }) => {
    const response = await createBriefcaseApi(getState().auth.user.id);
    return normalize(response.data, briefcase);
  }
);

export const getOrCreateBriefcaseOfSelfUserThunk = createAsyncThunkWrapped(
  "briefcases/getOrCreateBriefcaseOfSelfUser",
  async (_, { dispatch }) => {
    const normalized = await dispatch(getBriefcaseOfSelfUserThunk()).then(
      unwrapResult
    );
    if (!!normalized.result) {
      return normalized;
    }
    return await dispatch(createBriefcaseThunk()).then(unwrapResult);
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
      await dispatch(deleteBriefcaseThunk({ id: briefcaseId })).then(
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
