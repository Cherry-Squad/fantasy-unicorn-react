import { createSlice, createEntityAdapter, isAnyOf } from "@reduxjs/toolkit";
import { entityAdapterWithExtract } from "@utils/redux";
import { getContestByIdThunk } from ".";
import { getAllContestsThunk } from "./thunks";

export const myContestAdapter = entityAdapterWithExtract(
  createEntityAdapter(),
  "contests"
);

export const contests = createSlice({
  name: "contests",
  initialState: myContestAdapter.getInitialState(),
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      isAnyOf(getAllContestsThunk.fulfilled),
      (state, { payload }) => {
        myContestAdapter.removeAll(state);
        myContestAdapter.upsertManyFromPayload(state, payload);
      }
    );
    builder.addMatcher(
      isAnyOf(getContestByIdThunk.fulfilled),
      (state, { payload }) => {
        myContestAdapter.upsertOneFromPayload(state, payload);
      }
    );
  },
});

const reducer = contests.reducer;

export default reducer;
