import { loginThunk } from "@redux/auth";
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
        loginThunk.fulfilled
      ),
      (state, { payload }) => {
        usersAdapter.upsertOneFromPayload(state, payload);
      }
    );
  },
});

const reducer = users.reducer;

export default reducer;
