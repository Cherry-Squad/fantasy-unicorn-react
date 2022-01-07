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
        console.log(payload, meta, JSON.stringify(briefcase));
        briefcaseAdapter.upsertOne(state, {
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
        briefcaseAdapter.upsertOne(state, {
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
