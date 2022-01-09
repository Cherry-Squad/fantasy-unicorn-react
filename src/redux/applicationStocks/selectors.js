import { createSelector } from "@reduxjs/toolkit";

export const applicationStocksSelector = (state) => state.applicationStocks;

export const getApplicationStockByIdSelector = createSelector(
  applicationStocksSelector,
  (_, { id }) => id,
  ({ entities }, id) => entities[id]
);

export const getApplicationsByApplicationIdSelector = createSelector(
  applicationStocksSelector,
  (_, { applicationId }) => applicationId,
  ({ entities }, applicationId) =>
    Object.values(entities).filter(
      (v) => +v.contest_application_id === +applicationId
    )
);
