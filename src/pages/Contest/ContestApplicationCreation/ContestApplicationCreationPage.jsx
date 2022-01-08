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
import ContestApplicationCreationWidget from "./ContestApplicationCreationWidget";

const ContestApplicationCreationPage = () => {
  const { id } = useParams();

  useDocumentTitle(`Регистрация | #${id}`);

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
        <ContestApplicationCreationWidget contest={contest} />
      )}
    </Paper>
  );
};

export default ContestApplicationCreationPage;
