import { createSelector } from "@reduxjs/toolkit";

export const stocksSelector = (state) => state.stocks;

export const getAllStocksSelector = createSelector(
  stocksSelector,
  ({ entities }) => Object.values(entities)
);

export const getStocksByIdsSelector = createSelector(
  stocksSelector,
  (_, { ids }) => ids,
  ({ entities }, ids) => ids.map((id) => entities[id])
);

export const getStockByIdSelector = createSelector(
  stocksSelector,
  (_, { id }) => id,
  ({ entities }, id) => entities[id]
);
