import { createSelector } from "@reduxjs/toolkit";

export const briefcasesSelector = (state) => state.briefcases;

export const getBriefcaseByIdSelector = createSelector(
  briefcasesSelector,
  (_, { id }) => id,
  ({ entities }, id) => entities[id]
);

export const getBriefcaseByUserIdSelector = createSelector(
  briefcasesSelector,
  (_, { userId }) => userId,
  ({ entities }, userId) =>
    Object.values(entities).find((v) => +v.user_id === +userId)
);
