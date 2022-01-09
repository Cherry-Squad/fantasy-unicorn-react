import { createSlice, createEntityAdapter, isAnyOf } from "@reduxjs/toolkit";
import { entityAdapterWithExtract } from "@utils/redux";
import {
  deleteApplicationThunk,
  getApplicationsOfContestThunk,
  getApplicationsOfSelfUserThunk,
} from ".";

export const myApplicationAdapter = entityAdapterWithExtract(
  createEntityAdapter(),
  "contestApplications"
);

export const contestApplications = createSlice({
  name: "contestApplications",
  initialState: myApplicationAdapter.getInitialState(),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(deleteApplicationThunk.fulfilled, (state, { payload }) => {
      myApplicationAdapter.removeOne(state, payload.id);
    });
    builder.addMatcher(
      isAnyOf(
        getApplicationsOfSelfUserThunk.fulfilled,
        getApplicationsOfContestThunk.fulfilled
      ),
      (state, { payload }) => {
        myApplicationAdapter.upsertManyFromPayload(state, payload);
      }
    );
  },
});

const reducer = contestApplications.reducer;

export default reducer;
