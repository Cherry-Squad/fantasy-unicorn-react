import { createSelector } from "@reduxjs/toolkit";

export const contestsSelector = (state) => state.contests;

export const getAllContestsSelector = createSelector(
  contestsSelector,
  ({ entities }) => Object.values(entities)
);

export const getContestsByIdsSelector = createSelector(
  contestsSelector,
  (_, { ids }) => ids,
  ({ entities }, ids) => ids.map((id) => entities[id])
);

export const getContestByIdSelector = createSelector(
  contestsSelector,
  (_, { id }) => id,
  ({ entities }, id) => entities[id]
);
