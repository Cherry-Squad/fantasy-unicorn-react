import { createSlice, createEntityAdapter, isAnyOf } from "@reduxjs/toolkit";
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
          Object.values(payload.entities.contests)
        );
      }
    );
  },
});

const reducer = contests.reducer;

export default reducer;
