import { createSlice } from "@reduxjs/toolkit";

import {
  localStorageErase,
  localStorageSet,
  localStorageLoad,
} from "@utils/tokens";
import { setTokens, setAuthBag, setUser } from "./actions";

const initialState = {
  token: {
    accessToken: false,
    client: false,
    uid: false,
    expiry: false,
  },
  user: {
    id: -1,
  },
};

const setTokensHelper = (state, { accessToken, client, uid, expiry }) => {
  state.token = {
    accessToken,
    client,
    uid,
    expiry,
  };
  localStorageSet({ ...state });
};

const setUserHelper = (state, { id }) => {
  state.user = {
    id,
  };
  localStorageSet({ ...state });
};

const setAuthBagHelper = (state, { token, user }) => {
  setTokensHelper(state, token);
  setUserHelper(state, user);
};

export const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loadAuthBag(state) {
      setAuthBagHelper(state, localStorageLoad());
    },
    logout() {
      localStorageErase();
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(setTokens, (state, { payload }) =>
      setTokensHelper(state, payload)
    );
    builder.addCase(setAuthBag, (state, { payload }) =>
      setAuthBagHelper(state, payload)
    );
    builder.addCase(setUser, (state, { payload }) =>
      setUserHelper(state, payload)
    );
  },
});

const actions = auth.actions;
export const loadAuthBag = actions.loadAuthBag;
export const logout = actions.logout;

const reducer = auth.reducer;
export default reducer;
