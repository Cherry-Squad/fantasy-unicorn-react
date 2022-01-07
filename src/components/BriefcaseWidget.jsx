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
import { useLoading, useMySnackbar, useParamSelector } from "@utils/hooks";
import React, { useCallback, useEffect, useState } from "react";
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
        .catch((e) => {
          console.error(e);
          enqueueError(e);
        })
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
      />
    </>
  );
};

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
      {loading ? <CircularProgress size="24px" /> : <RefreshIcon />}
    </IconButton>
  );
};

const BriefcaseWidget = ({ briefcaseSize = 10 }) => {
  // const briefcaseLoading = useLoading(getOrCreateBriefcaseOfSelfUserThunk, {
  //   enqueue: true,
  // });

  // const userId = useSelector(userIdSelector);

  // const briefcase =
  //   useParamSelector(getBriefcaseByUserIdSelector, {
  //     userId,
  //   }) || {};

  // const { id, expiring_at: expiringAt, stocks: stocksIds } = briefcase;

  // const stocksAction = useCallback(
  //   () => getStocksOfBriefcaseThunk({ briefcaseId: id }),
  //   [id]
  // );

  // const stocksLoading = useLoading(stocksAction, {
  //   enqueue: true,
  // });

  // const stocks =
  //   useParamSelector(getStocksByIdsSelector, { ids: stocksIds || [] }) || [];

  // console.log(briefcaseLoading.status, stocksLoading.status, userId, id);

  // const loading = briefcaseLoading.loading || stocksLoading.loading;
  const userId = useSelector(userIdSelector);
  const dispatch = useDispatch();
  const { enqueueError } = useMySnackbar();
  const [loading, setLoading] = useState(false);
  const [executedOnce, setExecutedOnce] = useState(null);
  const briefcase =
    useParamSelector(getBriefcaseByUserIdSelector, { userId }) || {};
  const { id, expiring_at: expiringAt, stocks: stocksIds } = briefcase;
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
