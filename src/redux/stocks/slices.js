import { getApplicationStocksForContestIdThunk } from "@redux/applicationStocks";
import { getStocksOfBriefcaseThunk } from "@redux/briefcases/thunks";
import { createSlice, createEntityAdapter, isAnyOf } from "@reduxjs/toolkit";
import { entityAdapterWithExtract } from "@utils/redux";
import {
  createStockThunk,
  getStockByIdThunk,
  getStockByNameThunk,
  getOrCreateStockThunk,
} from "./thunks";

export const myStockAdapter = entityAdapterWithExtract(
  createEntityAdapter(),
  "stocks"
);

export const stocks = createSlice({
  name: "stocks",
  initialState: myStockAdapter.getInitialState(),
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      isAnyOf(
        createStockThunk.fulfilled,
        getStockByIdThunk.fulfilled,
        getStockByNameThunk.fulfilled,
        getOrCreateStockThunk.fulfilled
      ),
      (state, { payload }) => {
        myStockAdapter.upsertOneFromPayload(state, payload);
      }
    );
    builder.addMatcher(
      isAnyOf(
        getStocksOfBriefcaseThunk.fulfilled,
        getApplicationStocksForContestIdThunk.fulfilled
      ),
      (state, { payload }) => {
        myStockAdapter.upsertManyFromPayload(state, payload);
      }
    );
  },
});

const reducer = stocks.reducer;

export default reducer;
