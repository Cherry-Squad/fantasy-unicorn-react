import { createSlice, isAnyOf } from "@reduxjs/toolkit";

import { localStorageErase } from "@utils/tokens";
import { login, updateAccessToken } from "./thunks";
import { setTokens } from "./actions";

const initialState = {
  tokens: {
    accessToken: false,
    client: false,
    uid: false,
    expiry: false,
  },
  userId: 0,
};

export const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      localStorageErase();
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(updateAccessToken.rejected, () => initialState);
    builder.addMatcher(
      isAnyOf(login.fulfilled, updateAccessToken.fulfilled, setTokens),
      (state, { payload }) => {
        const { accessToken, client, uid, expiry } = payload.headers;

        state.tokens = {
          accessToken,
          client,
          uid,
          expiry,
        };

        state.userId = payload.data.id;
      }
    );
  },
});

const actions = auth.actions;
export const authenticate = actions.authenticate;
export const logout = actions.logout;

const reducer = auth.reducer;
export default reducer;
