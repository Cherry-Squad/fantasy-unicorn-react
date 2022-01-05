import { createSlice, createEntityAdapter, isAnyOf } from "@reduxjs/toolkit";
import {
  createStockThunk,
  getStockByIdThunk,
  getStockByNameThunk,
  getOrCreateStockThunk,
} from "./thunks";

export const stockAdapter = createEntityAdapter();

export const stocks = createSlice({
  name: "stocks",
  initialState: stockAdapter.getInitialState(),
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
        stockAdapter.upsertOne(
          state,
          payload.entities.contests[payload.result]
        );
      }
    );
  },
});

const reducer = stocks.reducer;

export default reducer;
