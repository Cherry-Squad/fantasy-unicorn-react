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
import { myNormalize } from "@utils/redux";

export const getStocksOfBriefcaseThunk = createAsyncThunkWrapped(
  "briefcases/getStocksOfBriefcase",
  async ({ briefcaseId }) => {
    const response = await getBriefcaseStocksByIdApi(briefcaseId);
    return myNormalize(response.data, [stock]);
  }
);

export const getBriefcaseOfSelfUserThunk = createAsyncThunkWrapped(
  "briefcases/getBriefcaseOfSelfUser",
  async () => {
    const response = await getBriefcasesOfSelfUserApi();
    return myNormalize(response.data?.[0], briefcase);
  }
);

export const createBriefcaseThunk = createAsyncThunkWrapped(
  "briefcases/createBriefcase",
  async (_, { getState }) => {
    const response = await createBriefcaseApi(getState().auth.user.id);
    return myNormalize(response.data, briefcase);
  }
);

export const getOrCreateBriefcaseOfSelfUserThunk = createAsyncThunkWrapped(
  "briefcases/getOrCreateBriefcaseOfSelfUser",
  async (_, { dispatch }) => {
    const { payload } = await dispatch(getBriefcaseOfSelfUserThunk());
    if (!!payload.result) {
      return payload;
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
    const { payload } = await dispatch(getBriefcaseOfSelfUserThunk());
    const briefcaseId = payload.result
      ? payload.entities.briefcases[payload.result].id
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
    return myNormalize(response.data, briefcase);
  }
);

export const removeStockFromBriefcaseThunk = createAsyncThunkWrapped(
  "briefcases/removeStock",
  async ({ stockId, briefcaseId }) => {
    const response = await updateBriefcaseApi(briefcaseId, {
      stock_id: stockId,
      add: false,
    });
    return myNormalize(response.data, briefcase);
  }
);
