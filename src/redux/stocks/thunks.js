import { stock } from "@validation/normalizr";
import { createAsyncThunkWrapped } from "@utils/thunkWrapper";
import { createStockApi, getStockByIdApi, getStockByNameApi } from "@api/stock";
import { unwrapResult } from "@reduxjs/toolkit";
import { myNormalize } from "@utils/redux";

export const createStockThunk = createAsyncThunkWrapped(
  "stocks/createStock",
  async ({ name }) => {
    const response = await createStockApi({ name });
    return myNormalize(response.data, stock);
  }
);

export const getStockByIdThunk = createAsyncThunkWrapped(
  "stocks/getStockById",
  async ({ id }) => {
    const response = await getStockByIdApi(id);
    return myNormalize(response.data, stock);
  }
);

export const getStockByNameThunk = createAsyncThunkWrapped(
  "stocks/getStockById",
  async ({ name }) => {
    const response = await getStockByNameApi({ name });
    return myNormalize(response.data, stock);
  }
);

export const getOrCreateStockThunk = createAsyncThunkWrapped(
  "stocks/getOrCreateStock",
  async ({ name }, { dispatch }) => {
    const { data: getData } = await getStockByNameApi({ name }).catch(() => ({
      data: null,
    }));
    if (getData) {
      return myNormalize(getData, stock);
    }
    const payload = await dispatch(createStockThunk({ name })).then(
      unwrapResult
    );
    return payload; // already normalized
  }
);
