import { createSelector } from "@reduxjs/toolkit";

import { loggedInSelector, userIdSelector } from "@redux/auth";

export const usersSelector = (state) => state.users;

export const getSelfUserSelector = createSelector(
  usersSelector,
  userIdSelector,
  ({ entities }, uid) => entities[uid]
);

export const getUsersByIdsSelector = createSelector(
  usersSelector,
  (_, { ids }) => ids,
  ({ entities }, ids) => ids.map((id) => entities[id])
);

export const getUserByIdSelector = createSelector(
  usersSelector,
  (_, { userId }) => userId,
  ({ entities }, uid) => entities[uid]
);

export const getUserStageSelector = createSelector(
  usersSelector,
  (_, { userId }) => userId,
  ({ entities }, uid) => {
    const user = entities[uid];
    if (!user) {
      return null;
    }
    const { emailValidated } = user;
    if (!emailValidated) {
      return 0;
    }
    return 3;
  }
);

export const getSelfUserStageSelector = createSelector(
  loggedInSelector,
  (state) =>
    getUserStageSelector(state, { userId: getSelfUserSelector(state)?.id }),
  (loggedIn, stage) => (!loggedIn ? -1 : stage)
);
