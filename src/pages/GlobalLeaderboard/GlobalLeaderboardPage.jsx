import { Paper } from "@mui/material";
import { useDocumentTitle } from "@utils/hooks";
import React from "react";
import GlobalLeaderboardWidget from "./GlobalLeaderboardWidget";

const GlobalLeaderboardPage = () => {
  useDocumentTitle("Таблица рекордов");
  return (
    <Paper>
      <GlobalLeaderboardWidget />
    </Paper>
  );
};

export default GlobalLeaderboardPage;
