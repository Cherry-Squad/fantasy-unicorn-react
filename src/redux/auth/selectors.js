import { createSelector } from "@reduxjs/toolkit";

const authSelector = (state) => state.auth;
const tokenSelector = (state) => state.auth.token;
const userSelector = (state) => state.auth.user;

export const loginTokenSelector = createSelector(
  tokenSelector,
  ({ accessToken, client, uid }) => ({ accessToken, client, uid })
);

export const loggedInSelector = createSelector(
  authSelector,
  (auth) =>
    auth.userId !== 0 &&
    auth.token.accessToken &&
    Date.now() < new Date(auth.token.expiry)
);

export const accessValidSelector = createSelector(
  tokenSelector,
  ({ accessToken, expiry }) => accessToken && Date.now() < new Date(expiry)
);

export const userIdSelector = createSelector(userSelector, (user) => user.id);
