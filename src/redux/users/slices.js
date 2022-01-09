import { changePasswordWithTokenThunk, loginThunk } from "@redux/auth";
import { getApplicationsOfContestThunk } from "@redux/contestApplications";
import { createSlice, createEntityAdapter, isAnyOf } from "@reduxjs/toolkit";
import { entityAdapterWithExtract } from "@utils/redux";
import { usersCreateThunk, usersGetSelfUserThunk } from "./thunks";

export const usersAdapter = entityAdapterWithExtract(
  createEntityAdapter(),
  "users"
);

export const users = createSlice({
  name: "users",
  initialState: usersAdapter.getInitialState(),
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      isAnyOf(
        usersCreateThunk.fulfilled,
        usersGetSelfUserThunk.fulfilled,
        loginThunk.fulfilled,
        changePasswordWithTokenThunk.fulfilled
      ),
      (state, { payload }) => {
        usersAdapter.upsertOneFromPayload(state, payload);
      }
    );
    builder.addMatcher(
      isAnyOf(getApplicationsOfContestThunk.fulfilled),
      (state, { payload }) => {
        usersAdapter.upsertManyFromPayload(state, payload);
      }
    );
  },
});

const reducer = users.reducer;

export default reducer;
