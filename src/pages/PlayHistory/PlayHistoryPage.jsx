import { Paper } from "@mui/material";
import { useDocumentTitle } from "@utils/hooks";
import React from "react";
import PlayHistoryWidget from "./PlayHistoryWidget";

const PlayHistoryPage = () => {
  useDocumentTitle("Конкурсы");
  return (
    <Paper>
      <PlayHistoryWidget />
    </Paper>
  );
};

export default PlayHistoryPage;
