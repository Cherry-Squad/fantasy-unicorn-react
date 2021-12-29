import { createSlice, isAnyOf } from "@reduxjs/toolkit";

import {
  localStorageErase,
  localStorageSet,
  localStorageLoad,
} from "@utils/tokens";
import { loginThunk } from "./thunks";
import { setTokens } from "./actions";

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
  const a = 1;
  state.token = {
    accessToken,
    client,
    uid,
    expiry,
  };
  localStorageSet({ ...state });
};

const setUserHelper = (state, { id }) => {
  state.user.id = id;
};

const setAuthBagHelper = (state, { token, user }) => {
  setTokensHelper(state, token);
  setUserHelper(state, user);
};

export const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, { payload }) {
      setUserHelper(state, payload);
    },
    setAuthBag(state, { payload }) {
      setAuthBagHelper(state, payload);
    },
    loadAuthBag(state) {
      setAuthBagHelper(state, localStorageLoad());
    },
    logout(state) {
      localStorageErase();
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(setTokens, (state, { payload }) =>
      setTokensHelper(state, payload)
    );
    builder.addCase(loginThunk.fulfilled, (state, { payload }) =>
      setAuthBagHelper(state, payload)
    );
    // builder.addCase(setTokens, (state, { payload }) => {
    //   const { accessToken, client, uid, expiry } = payload;
    //   state.tokens = {
    //     accessToken,
    //     client,
    //     uid,
    //     expiry,
    //   };
    // });
    // builder.addCase(loginThunk.fulfilled, (state, { payload }) => {
    //   const { accessToken, client, uid, expiry } = payload.headers;
    //   state.tokens = {
    //     accessToken,
    //     client,
    //     uid,
    //     expiry,
    //   };
    //   state.userId = payload.data.id;
    // });
  },
});

const actions = auth.actions;
export const setUser = actions.setUser;
export const setAuthBag = actions.setAuthBag;
export const loadAuthBag = actions.loadAuthBag;
export const logout = actions.logout;

const reducer = auth.reducer;
export default reducer;
