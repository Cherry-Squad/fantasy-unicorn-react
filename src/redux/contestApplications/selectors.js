import { userIdSelector } from "@redux/auth";
import { createSelector } from "@reduxjs/toolkit";

export const applicationsSelector = (state) => state.contestApplications;

export const getApplicationByIdSelector = createSelector(
  applicationsSelector,
  (_, { id }) => id,
  ({ entities }, id) => entities[id]
);

export const getApplicationsByContestIdSelector = createSelector(
  applicationsSelector,
  (_, { contestId }) => contestId,
  ({ entities }, contestId) =>
    Object.values(entities).filter((v) => +v.contest_id === +contestId)
);

export const getSelfUserApplicationByContestIdSelector = createSelector(
  applicationsSelector,
  userIdSelector,
  (_, { contestId }) => contestId,
  ({ entities }, userId, contestId) =>
    Object.values(entities).find(
      (v) => +v.contest_id === +contestId && +v.user_id === +userId
    )
);
