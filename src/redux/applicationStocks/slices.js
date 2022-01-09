import { createSlice, createEntityAdapter, isAnyOf } from "@reduxjs/toolkit";
import { entityAdapterWithExtract } from "@utils/redux";
import { getApplicationStocksForContestIdThunk } from ".";

export const myApplicationStocksAdapter = entityAdapterWithExtract(
  createEntityAdapter(),
  "contestApplicationStocks"
);

export const applicationStocks = createSlice({
  name: "applicationStocks",
  initialState: myApplicationStocksAdapter.getInitialState(),
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      isAnyOf(getApplicationStocksForContestIdThunk.fulfilled),
      (state, { payload }) => {
        myApplicationStocksAdapter.upsertManyFromPayload(state, payload);
      }
    );
  },
});

const reducer = applicationStocks.reducer;

export default reducer;
