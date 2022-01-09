import BigProcess from "@components/BigProcess";
import Error from "@components/Error";
import { Paper } from "@mui/material";
import { getApplicationStocksForContestIdThunk } from "@redux/applicationStocks";
import { getApplicationsOfContestThunk } from "@redux/contestApplications";
import { getContestByIdSelector, getContestByIdThunk } from "@redux/contests";
import {
  useDocumentTitle,
  useLoadingRedux,
  useMySnackbar,
  useParamSelector,
} from "@utils/hooks";
import React from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useIntervalWhen, useTimeoutWhen } from "rooks";
import ContestWidget from "./ContestWidget";

const ContestPage = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const { enqueueError } = useMySnackbar();

  useDocumentTitle("#" + id);

  const contestLoading = useLoadingRedux(getContestByIdThunk, {
    enqueue: true,
    params: { id },
  });

  const applicationsLoading = useLoadingRedux(getApplicationsOfContestThunk, {
    enqueue: true,
    params: { contestId: id },
  });

  const stocksLoading = useLoadingRedux(getApplicationStocksForContestIdThunk, {
    enqueue: true,
    params: { contestId: id },
  });

  const showProcess =
    contestLoading.loading ||
    applicationsLoading.loading ||
    stocksLoading.loading ||
    contestLoading.idle ||
    applicationsLoading.idle ||
    stocksLoading.idle;

  const error =
    contestLoading.error || applicationsLoading.error || stocksLoading.error;

  const contest = useParamSelector(getContestByIdSelector, { id });

  useIntervalWhen(
    () => {
      dispatch(getContestByIdThunk({ id })).catch((e) =>
        enqueueError(e?.message || e?.data || e)
      );
      dispatch(getApplicationsOfContestThunk({ contestId: id })).catch((e) =>
        enqueueError(e?.message || e?.data || e)
      );
      dispatch(getApplicationStocksForContestIdThunk({ contestId: id })).catch(
        (e) => enqueueError(e?.message || e?.data || e)
      );
    },
    10 * 1000,
    !showProcess && !error,
    true
  );

  return (
    <Paper sx={{ p: 3 }}>
      {showProcess ? (
        <BigProcess />
      ) : error ? (
        <Error error={error} />
      ) : (
        <ContestWidget contest={contest} />
      )}
    </Paper>
  );
};

export default ContestPage;
