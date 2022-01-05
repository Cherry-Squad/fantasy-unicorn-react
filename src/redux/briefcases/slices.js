import { createSlice, createEntityAdapter, isAnyOf } from "@reduxjs/toolkit";
import {
  addStockToBriefcaseThunk,
  createBriefcaseThunk,
  deleteBriefcaseThunk,
  getBriefcaseOfSelfUserThunk,
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
    builder.addMatcher(
      isAnyOf(
        getBriefcaseOfSelfUserThunk.fulfilled,
        createBriefcaseThunk.fulfilled,
        addStockToBriefcaseThunk.fulfilled,
        removeStockFromBriefcaseThunk.fulfilled
      ),
      (state, { payload }) => {
        briefcaseAdapter.upsertOne(
          state,
          payload.entities.contests[payload.result]
        );
      }
    );
  },
});

const reducer = briefcases.reducer;

export default reducer;
