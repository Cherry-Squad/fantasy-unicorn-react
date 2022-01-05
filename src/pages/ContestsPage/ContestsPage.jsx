import { Paper } from "@mui/material";
import { useDocumentTitle } from "@utils/hooks";
import React from "react";
import ContestsWidget from "./ContestsWidget";

const ContestsPage = () => {
  useDocumentTitle("Конкурсы");
  return (
    <Paper>
      <ContestsWidget />
    </Paper>
  );
};

export default ContestsPage;
