import BigProcess from "@components/BigProcess";
import Error from "@components/Error";
import { Paper } from "@mui/material";
import { getContestByIdSelector, getContestByIdThunk } from "@redux/contests";
import { useDocumentTitle, useLoading, useParamSelector } from "@utils/hooks";
import React, { useCallback } from "react";
import { useParams } from "react-router-dom";
import ContestWidget from "./ContestWidget";

const ContestPage = () => {
  const { id } = useParams();

  useDocumentTitle("#" + id);

  const actionCreator = useCallback(() => getContestByIdThunk({ id }), [id]);

  const { loading, error, idle } = useLoading(actionCreator, { enqueue: true });
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
