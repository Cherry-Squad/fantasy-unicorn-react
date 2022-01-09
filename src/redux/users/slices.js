import { changePasswordWithTokenThunk, loginThunk } from "@redux/auth";
import { getApplicationsOfContestThunk } from "@redux/contestApplications";
import { registerOnContestThunk } from "@redux/contests";
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
  reducers: {
    subCoins(state, { payload: { userId, payment } }) {
      const user = state.entities[userId];
      usersAdapter.upsertOne(state, { ...user, coins: user.coins - payment });
    },
  },
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

export const subCoins = users.actions.subCoins;

const reducer = users.reducer;

export default reducer;
