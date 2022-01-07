import BigProcess from "@components/BigProcess";
import Error from "@components/Error";
import { Paper } from "@mui/material";
import { getContestByIdSelector, getContestByIdThunk } from "@redux/contests";
import {
  useDocumentTitle,
  useLoadingRedux,
  useParamSelector,
} from "@utils/hooks";
import React from "react";
import { useParams } from "react-router-dom";
import ContestWidget from "./ContestWidget";

const ContestPage = () => {
  const { id } = useParams();

  useDocumentTitle("#" + id);

  const { loading, error, idle } = useLoadingRedux(getContestByIdThunk, {
    enqueue: true,
    params: { id },
  });
  const contest = useParamSelector(getContestByIdSelector, { id });

  return (
    <Paper sx={{ p: 3 }}>
      {loading || idle ? (
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
