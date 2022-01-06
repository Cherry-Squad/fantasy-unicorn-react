import { createSlice, createEntityAdapter, isAnyOf } from "@reduxjs/toolkit";
import { getBriefcaseOfSelfUserThunk, getStocksOfBriefcaseThunk } from ".";
import {
  addStockToBriefcaseThunk,
  createBriefcaseThunk,
  deleteBriefcaseThunk,
  removeStockFromBriefcaseThunk,
} from "./thunks";

export const briefcaseAdapter = createEntityAdapter();

export const briefcases = createSlice({
  name: "briefcases",
  initialState: briefcaseAdapter.getInitialState(),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(deleteBriefcaseThunk.fulfilled, (state, { payload }) => {
      briefcaseAdapter.removeOne(state, payload.id);
    });
    builder.addCase(
      getStocksOfBriefcaseThunk.fulfilled,
      (state, { payload, meta }) => {
        const briefcase = state.entities[meta.arg.briefcaseId];
        briefcaseAdapter.updateOne(state, {
          ...briefcase,
          stocks: payload.entities.stocks
            ? payload.entities?.stocks.map(({ id }) => id)
            : [],
        });
      }
    );
    // builder.addMatcher(
    //   isAnyOf(getBriefcasesOfSelfUserThunk.fulfilled),
    //   (state, { payload }) => {
    //     briefcaseAdapter.upsertMany(state, payload.entities.briefcases);
    //   }
    // );
    builder.addMatcher(
      isAnyOf(
        createBriefcaseThunk.fulfilled,
        addStockToBriefcaseThunk.fulfilled,
        removeStockFromBriefcaseThunk.fulfilled,
        getBriefcaseOfSelfUserThunk.fulfilled
      ),
      (state, { payload }) => {
        const data = payload.entities.briefcases?.[payload.result];
        if (data) {
          briefcaseAdapter.upsertOne(
            state,
            payload.entities.briefcases?.[payload.result]
          );
        }
      }
    );
  },
});

const reducer = briefcases.reducer;

export default reducer;
