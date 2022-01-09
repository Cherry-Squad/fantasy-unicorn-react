import { Chip, Typography } from "@mui/material";
import { Box } from "@mui/system";
import {
  getApplicationsByApplicationIdSelector,
  getApplicationStocksForContestIdThunk,
} from "@redux/applicationStocks";
import { getStocksByIdsSelector } from "@redux/stocks";
import { unwrapResult } from "@reduxjs/toolkit";
import { useMySnackbar, useParamSelector } from "@utils/hooks";
import React, { useCallback, useMemo } from "react";
import { useDispatch } from "react-redux";
import { useIntervalWhen } from "rooks";
import { StatusEnum } from "@dict/contest";
import CoinsEntryFeeBadge from "@pages/ContestsPage/CoinsEntryFeeBadge";
import FantasyPointsThresholdBadge from "@pages/ContestsPage/FantasyPointsThresholdBadge";

const StockItem = ({ application, applicationStocks, stock }) => {
  const {
    reg_price: regPrice,
    final_price: finalPrice,
    multiplier,
    direction_up: directionUp,
  } = applicationStocks.find((app) => +app.stock_id === +stock.id);

  const success = directionUp ? regPrice <= finalPrice : regPrice > finalPrice;

  return (
    <Chip
      label={`${stock.name} $${regPrice}${
        directionUp ? "↗" : "↘"
      } x${multiplier} ${!!finalPrice ? `итог: $${finalPrice}` : ""}`}
      variant="outlined"
      sx={{ m: 1 }}
      color={!!finalPrice ? (success ? "success" : "error") : undefined}
    />
  );
};

const ApplicationWidget = ({
  contest,
  application,
  showMonetaryStats = true,
}) => {
  const dispatch = useDispatch();
  const { enqueueError } = useMySnackbar();
  const applicationStocks = useParamSelector(
    getApplicationsByApplicationIdSelector,
    { applicationId: application.id }
  );

  const stockIds = useMemo(
    () => applicationStocks.map(({ stock_id }) => stock_id) || [],
    [applicationStocks]
  );

  const stocks = useParamSelector(getStocksByIdsSelector, { ids: stockIds });

  const applicationRegProcessed = applicationStocks
    ? applicationStocks.every(({ reg_price }) => reg_price !== null)
    : false;

  const contestIsOver =
    contest.status === StatusEnum.FINISHED && applicationRegProcessed;

  const handleInterval = useCallback(
    () =>
      dispatch(getApplicationStocksForContestIdThunk({ contestId: contest.id }))
        .then(unwrapResult)
        .catch((e) => enqueueError(e?.message || e?.data || e)),
    [contest.id, dispatch, enqueueError]
  );

  useIntervalWhen(handleInterval, 10 * 1000, !applicationRegProcessed, true);

  return (
    <Box>
      {contestIsOver && (
        <>
          <Box sx={{ display: "flex" }}>
            <Typography variant="body1" sx={{ flexGrow: 1 }}>
              Итоговая позиция:
            </Typography>
            <Typography variant="h6">{application.final_position}</Typography>
          </Box>
          {showMonetaryStats && (
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-around",
                width: "100%",
              }}
            >
              <CoinsEntryFeeBadge
                value={application.coins_delta}
                sx={{ width: "150px" }}
              />
              <FantasyPointsThresholdBadge
                value={application.fantasy_points_delta}
                sx={{ width: "150px" }}
                appendLess={false}
              />
            </Box>
          )}
        </>
      )}
      {applicationRegProcessed ? (
        <Box sx={{ display: "flex", flexWrap: "wrap" }}>
          {stocks.map((stock) => (
            <StockItem
              key={stock.name}
              application={application}
              applicationStocks={applicationStocks}
              stock={stock}
            />
          ))}
        </Box>
      ) : (
        <Box>Ваша ставка обрабатывается...</Box>
      )}
    </Box>
  );
};

export default ApplicationWidget;
