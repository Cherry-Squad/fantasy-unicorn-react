import { createSlice, createEntityAdapter, isAnyOf } from "@reduxjs/toolkit";
import { usersCreateThunk, usersGetSelfUserThunk } from "./thunks";

export const usersAdapter = createEntityAdapter();

export const users = createSlice({
  name: "users",
  initialState: usersAdapter.getInitialState(),
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      isAnyOf(usersCreateThunk.fulfilled, usersGetSelfUserThunk.fulfilled),
      (state, { payload }) => {
        usersAdapter.upsertOne(state, payload.entities.users[payload.result]);
      }
    );
  },
});

const reducer = users.reducer;

export default reducer;
