import { createSlice, createEntityAdapter, isAnyOf } from "@reduxjs/toolkit";
import { getContestByIdThunk } from ".";
import { getAllContestsThunk } from "./thunks";

export const contestAdapter = createEntityAdapter();

export const contests = createSlice({
  name: "contests",
  initialState: contestAdapter.getInitialState(),
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      isAnyOf(getAllContestsThunk.fulfilled),
      (state, { payload }) => {
        contestAdapter.removeAll(state);
        contestAdapter.upsertMany(
          state,
          Object.values(payload.entities?.contests || {}) || []
        );
      }
    );
    builder.addMatcher(
      isAnyOf(getContestByIdThunk.fulfilled),
      (state, { payload }) => {
        if (!payload) return;
        contestAdapter.upsertOne(
          state,
          payload.entities?.contests[payload.result]
        );
      }
    );
  },
});

const reducer = contests.reducer;

export default reducer;
