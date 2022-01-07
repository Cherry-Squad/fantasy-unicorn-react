import { createSlice, createEntityAdapter, isAnyOf } from "@reduxjs/toolkit";
import { entityAdapterWithExtract } from "@utils/redux";
import { getBriefcaseOfSelfUserThunk, getStocksOfBriefcaseThunk } from ".";
import {
  addStockToBriefcaseThunk,
  createBriefcaseThunk,
  deleteBriefcaseThunk,
  removeStockFromBriefcaseThunk,
} from "./thunks";

export const myBriefcaseAdapter = entityAdapterWithExtract(
  createEntityAdapter(),
  "briefcases"
);

export const briefcases = createSlice({
  name: "briefcases",
  initialState: myBriefcaseAdapter.getInitialState(),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(deleteBriefcaseThunk.fulfilled, (state, { payload }) => {
      myBriefcaseAdapter.removeOne(state, payload.id);
    });
    builder.addCase(
      getStocksOfBriefcaseThunk.fulfilled,
      (state, { payload, meta }) => {
        const briefcase = state.entities[meta.arg.briefcaseId];
        myBriefcaseAdapter.upsertOne(state, {
          ...briefcase,
          stocks: payload.entities.stocks
            ? Object.values(payload.entities?.stocks).map(({ id }) => id)
            : [],
        });
      }
    );
    builder.addCase(
      addStockToBriefcaseThunk.fulfilled,
      (state, { payload, meta }) => {
        const data = payload.entities.briefcases[payload.result];
        const fromState = state.entities[payload.result];
        myBriefcaseAdapter.upsertOne(state, {
          ...data,
          stocks: [...(fromState.stocks || []), meta.arg.stockId],
        });
      }
    );
    builder.addMatcher(
      isAnyOf(
        createBriefcaseThunk.fulfilled,
        removeStockFromBriefcaseThunk.fulfilled,
        getBriefcaseOfSelfUserThunk.fulfilled
      ),
      (state, { payload }) => {
        myBriefcaseAdapter.upsertOneFromPayload(state, payload);
      }
    );
  },
});

const reducer = briefcases.reducer;

export default reducer;
