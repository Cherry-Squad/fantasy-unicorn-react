import { CircularProgress, Divider, IconButton, Tooltip } from "@mui/material";
import { Box } from "@mui/system";
import { userIdSelector } from "@redux/auth";
import {
  getBriefcaseByUserIdSelector,
  getBriefcaseOfSelfUserThunk,
  getOrCreateBriefcaseOfSelfUserThunk,
  getStocksOfBriefcaseThunk,
  refreshBriefcaseThunk,
} from "@redux/briefcases";
import { getStocksByIdsSelector } from "@redux/stocks";
import { useLoading, useParamSelector } from "@utils/hooks";
import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import BigProcess from "./BigProcess";
import StocksList from "./StocksList";
import RefreshIcon from "@mui/icons-material/Refresh";
import { secondsToDhms } from "@utils/date";
import VisibleTimer from "./VisibleTimer";

const RefreshButton = ({ briefcase }) => {
  const { user_id: userId, expiring_at: expiringAt } = briefcase;
  const delta = new Date(expiringAt) - new Date();
  const expired = !!expiringAt && delta <= 0;
  const actionCreator = useCallback(
    () => refreshBriefcaseThunk({ userId }),
    [userId]
  );
  const { loading, execute } = useLoading(actionCreator, {
    immediate: false,
    enqueue: true,
  });
  return (
    <IconButton disabled={!expired || loading} onClick={execute}>
      {loading ? <CircularProgress /> : <RefreshIcon />}
    </IconButton>
  );
};

const BriefcaseWidget = ({ briefcaseSize = 10 }) => {
  const briefcaseLoading = useLoading(getOrCreateBriefcaseOfSelfUserThunk, {
    enqueue: true,
  });

  const userId = useSelector(userIdSelector);

  const briefcase =
    useParamSelector(getBriefcaseByUserIdSelector, {
      userId,
    }) || {};

  const { id, expiring_at: expiringAt, stocks: stocksIds } = briefcase;

  const stocksAction = useCallback(
    () => getStocksOfBriefcaseThunk({ briefcaseId: id }),
    [id]
  );

  const stocksLoading = useLoading(stocksAction, {
    enqueue: true,
  });

  const stocks =
    useParamSelector(getStocksByIdsSelector, { ids: stocksIds || [] }) || [];

  console.log(briefcaseLoading.status, stocksLoading.status, userId, id);

  if (briefcaseLoading.loading || stocksLoading.loading) {
    return <BigProcess />;
  }
  return (
    <Box>
      <Box sx={{ display: "flex", p: 1, pr: 2, alignItems: "center" }}>
        <Box sx={{ flexGrow: 1 }}>
          <RefreshButton briefcase={briefcase} sx={{ flexGrow: 1 }} />
        </Box>
        <VisibleTimer targetDate={new Date(expiringAt)} />
      </Box>
      <Divider sx={{ mt: 1, mb: 1 }} />
      <StocksList size={briefcaseSize} content={stocks} sx={{ p: 2 }} />
    </Box>
  );
};

export default BriefcaseWidget;
