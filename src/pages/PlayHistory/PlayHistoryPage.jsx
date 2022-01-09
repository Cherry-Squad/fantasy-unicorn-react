import { Paper } from "@mui/material";
import { useDocumentTitle } from "@utils/hooks";
import React from "react";
import PlayHistoryWidget from "./PlayHistoryWidget";

const PlayHistoryPage = () => {
  useDocumentTitle("История игр");
  return (
    <Paper>
      <PlayHistoryWidget />
    </Paper>
  );
};

export default PlayHistoryPage;
