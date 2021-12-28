import { createSelector } from "@reduxjs/toolkit";

import { loggedInSelector, userIdSelector } from "@redux/auth";
import { UserRole, UserState } from "@dictionary/user";

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
    const { emailValidated, userState, team, request, userRole } = user;
    if (!emailValidated) {
      return 0;
    }
    if (userRole === UserRole.USER) {
      const unfilledForm = userState === UserState.REGISTERED;
      if (unfilledForm) {
        return 1;
      }
      const notInTeam = team === null && request === null;
      if (notInTeam) {
        return 2;
      }
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
