import {
  CircularProgress,
  Divider,
  IconButton,
  LinearProgress,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { userIdSelector } from "@redux/auth";
import {
  addStockToBriefcaseThunk,
  getBriefcaseByUserIdSelector,
  getOrCreateBriefcaseOfSelfUserThunk,
  getStocksOfBriefcaseThunk,
  refreshBriefcaseThunk,
} from "@redux/briefcases";
import { getStocksByIdsSelector } from "@redux/stocks";
import { useLoadingRedux, useMySnackbar, useParamSelector } from "@utils/hooks";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import StocksList from "./StocksList";
import RefreshIcon from "@mui/icons-material/Refresh";
import VisibleTimer from "./VisibleTimer";
import { AddStockModal } from "./AddStock";
import AddIcon from "@mui/icons-material/Add";
import { unwrapResult } from "@reduxjs/toolkit";

const AddButton = ({ briefcase, stocks }) => {
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const { enqueueError } = useMySnackbar();
  const dispatch = useDispatch();

  const stockNames = useMemo(() => stocks.map((s) => s.name), [stocks]);
  const { id: briefcaseId, expiring_at: expiringAt } = briefcase;
  const delta = new Date(expiringAt) - new Date();
  const expired = !!expiringAt && delta <= 0;
  const canAdd = !expired && stocks.length < 10;

  const onClick = useCallback(() => setOpenModal(true), [setOpenModal]);

  const onAdd = useCallback(
    ({ id }) => {
      setLoading(true);
      dispatch(addStockToBriefcaseThunk({ stockId: id, briefcaseId }))
        .then(() => setOpenModal(false))
        .catch((e) => enqueueError(e))
        .finally(() => setLoading(false));
    },
    [dispatch, setOpenModal, briefcaseId, enqueueError]
  );

  return (
    <>
      <IconButton disabled={!canAdd} onClick={onClick}>
        {loading ? <CircularProgress size="24px" /> : <AddIcon />}
      </IconButton>
      <AddStockModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        onAdd={onAdd}
        stopList={stockNames}
      />
    </>
  );
};

const RefreshButton = ({ briefcase }) => {
  const { user_id: userId, expiring_at: expiringAt } = briefcase;
  const delta = new Date(expiringAt) - new Date();
  const expired = !!expiringAt && delta <= 0;
  const { loading, execute } = useLoadingRedux(refreshBriefcaseThunk, {
    immediate: false,
    enqueue: true,
    params: { userId },
  });
  return (
    <IconButton disabled={!expired || loading} onClick={execute}>
      {loading ? <CircularProgress size="24px" /> : <RefreshIcon />}
    </IconButton>
  );
};

const BriefcaseWidget = ({ briefcaseSize = 10 }) => {
  const userId = useSelector(userIdSelector);
  const dispatch = useDispatch();
  const { enqueueError } = useMySnackbar();
  const [loading, setLoading] = useState(false);
  const [executedOnce, setExecutedOnce] = useState(null);
  const briefcase =
    useParamSelector(getBriefcaseByUserIdSelector, { userId }) || {};
  const { expiring_at: expiringAt, stocks: stocksIds } = briefcase;
  const stocks =
    useParamSelector(getStocksByIdsSelector, { ids: stocksIds || [] }) || [];

  useEffect(() => {
    if (!loading && !executedOnce) {
      setLoading(true);
      setExecutedOnce(true);
      dispatch(getOrCreateBriefcaseOfSelfUserThunk())
        .then(unwrapResult)
        .then(({ result }) =>
          dispatch(getStocksOfBriefcaseThunk({ briefcaseId: result }))
        )
        .then(unwrapResult)
        .catch((e) => {
          enqueueError(e?.message || e);
        })
        .finally(() => setLoading(false));
    }
  }, [
    loading,
    executedOnce,
    setLoading,
    dispatch,
    enqueueError,
    setExecutedOnce,
  ]);

  return (
    <Box>
      <Box sx={{ display: "flex", p: 1, pr: 2, alignItems: "center" }}>
        <Box sx={{ flexGrow: 1 }}>
          <RefreshButton briefcase={briefcase} />
          <AddButton briefcase={briefcase} stocks={stocks} />
        </Box>
        {loading ? (
          <Typography color="text.secondary">00:00</Typography>
        ) : (
          <VisibleTimer
            targetDate={new Date(expiringAt)}
            color="text.secondary"
          />
        )}
      </Box>
      {loading && <LinearProgress />}
      <Divider sx={{ mt: 1, mb: 1 }} />
      {!loading && executedOnce && (
        <StocksList size={briefcaseSize} content={stocks} sx={{ p: 2 }} />
      )}
    </Box>
  );
};

export default BriefcaseWidget;
