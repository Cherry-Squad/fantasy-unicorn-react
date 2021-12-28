import { createSelector } from "@reduxjs/toolkit";

const authSelector = (state) => state.auth;
const tokensSelector = (state) => state.auth.tokens;

export const loginTokensSelector = createSelector(
  authSelector,
  ({ accessToken, client, uid }) => ({ accessToken, client, uid })
);

export const loggedInSelector = createSelector(
  authSelector,
  (auth) =>
    auth.userId !== 0 &&
    auth.tokens.accessToken &&
    Date.now() < new Date(auth.tokens.expiry)
);

export const accessTokenSelector = (state) => state.auth.tokens.accessToken;

export const accessValidSelector = createSelector(
  tokensSelector,
  ({ accessToken, expiry }) => accessToken && Date.now() < new Date(expiry)
);

export const userIdSelector = createSelector(
  authSelector,
  (auth) => auth.userId
);
